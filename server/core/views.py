from rest_framework.views import APIView
from .serializers import UserSerializer, TaskSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, APIException
from .models import User, Task
from .tokens import create_jwt_pair
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework.decorators import permission_classes

def create_model_response(model, serialized_data):
    response_data = {
        model.__name__: serialized_data
    }
    return response_data
class UsersView(APIView):
    def post(self, request):
        userSerializer = UserSerializer(data=request.data)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return Response(create_model_response(User, userSerializer.data))
    
    @permission_classes([IsAuthenticated])
    def get(self, request):
        user = request.user
        return Response(create_model_response(User, UserSerializer(user).data))
    
    @permission_classes([IsAuthenticated])
    def put(self, request):
        user = request.user
        userSerializer  = UserSerializer(user, data=request.data, partial=True)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return Response(create_model_response(User, userSerializer.data))

class UserLoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if not user:
            raise AuthenticationFailed("User does not exist")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Invalid password")
        
        tokens = create_jwt_pair(user)
        print(AccessToken(tokens["access"])['user_id'])
        userSerializer = UserSerializer(user)
        return Response({
            "user": userSerializer.data,
            "tokens": tokens
        })

class TasksView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        data = request.data
        user = request.user
        data['user'] = user.id
        taskSerializer =  TaskSerializer(data = data)
        taskSerializer.is_valid(raise_exception=True)
        taskSerializer.save()
        return Response(create_model_response(Task, taskSerializer.data))
    
    def get(self,request, taskId=None):
        user = request.user
        tasks = []
        many = True
        if taskId:
            tasks = Task.objects.filter(id=taskId, user=user.id).first()
            many = False
        else:
            tasks = Task.objects.filter(user=user.id).all()
        taskSerializer =  TaskSerializer(tasks, many=many)
        return Response(create_model_response(Task, taskSerializer.data))
    
    def put(self, request, taskId):
        task = Task.objects.filter(id=taskId, user=request.user.id).first()
        if not task:
            raise APIException("Invalid task for the user")

        taskSerializer = TaskSerializer(task, data=request.data, partial=True)
        taskSerializer.is_valid(raise_exception=True)
        taskSerializer.save()
        return Response(create_model_response(Task, taskSerializer.data))
    
    def delete(self, request, taskId):
        task = Task.objects.filter(id=taskId, user=request.user.id).first()
        if not task:
            raise APIException("Invalid task for the user")
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)