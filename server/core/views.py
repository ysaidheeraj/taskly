from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response

class UsersView(APIView):
    def post(self, request):
        userSerializer = UserSerializer(data=request.data)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return Response(userSerializer.data)