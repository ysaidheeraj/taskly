from django.urls import path
from .views import UsersView, UserLoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('auth/register', UsersView.as_view()),
    path('auth/profile', UsersView.as_view()),
    path('auth/login', UserLoginView.as_view()),
    path('auth/token/create', TokenObtainPairView.as_view(), name='token_create'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify', TokenVerifyView.as_view(), name='token_verify')
]