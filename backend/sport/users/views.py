from django.shortcuts import render, get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.

class UserViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=user)


class CheckToken(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = get_object_or_404(Token, key=request.headers['Authorization'].split()[-1]).user
        result = user is not None
        return Response({'detail': result})
