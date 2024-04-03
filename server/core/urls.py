from django.urls import path
from .views import UsersView

urlpatterns = [
    path('auth/register', UsersView.as_view())
]