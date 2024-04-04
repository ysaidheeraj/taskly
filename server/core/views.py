from functools import wraps
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from .tokens import create_jwt_pair
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken

class UsersView(APIView):
    def post(self, request):
        userSerializer = UserSerializer(data=request.data)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return Response(userSerializer.data)
    
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)

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