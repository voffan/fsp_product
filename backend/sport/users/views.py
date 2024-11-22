from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.

class UserViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer