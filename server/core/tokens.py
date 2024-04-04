from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

def create_jwt_pair(User):
    refreshToken = RefreshToken.for_user(User)
    tokens = {
        "access": str(refreshToken.access_token),
        "refresh": str(refreshToken)
    }
    return tokens
