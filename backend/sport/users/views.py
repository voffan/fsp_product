from django.shortcuts import render, get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.status import HTTP_201_CREATED

# Create your views here.

class UserViewSet(ModelViewSet):
    #permission_classes = [IsAdminUser]

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=HTTP_201_CREATED)


class CheckToken(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = get_object_or_404(Token, key=request.headers['Authorization'].split()[-1]).user
        result = user is not None
        return Response({'detail': result})


class GetUserData(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token_key = request.headers.get('Authorization', '').split()[-1]
        try:
            token = Token.objects.get(key=token_key)
            user = token.user
            user_data = {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_active': user.is_active,
            }
            return Response(user_data)
        except Token.DoesNotExist:
            return Response({'error': 'Неправильный токен'}, status=400)