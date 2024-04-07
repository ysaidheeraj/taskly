from django.urls import path
from .views import UsersView, UserLoginView, TasksView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('auth/register', UsersView.as_view()),
    path('auth/profile', UsersView.as_view()),
    path('auth/update', UsersView.as_view()),
    path('auth/login', UserLoginView.as_view()),
    path('auth/token/create', TokenObtainPairView.as_view(), name='token_create'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify', TokenVerifyView.as_view(), name='token_verify'),

    path('tasks', TasksView.as_view()),
    path('tasks/<int:taskId>', TasksView.as_view()),
    path('tasks/create', TasksView.as_view())
]