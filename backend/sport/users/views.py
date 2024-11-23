from django.shortcuts import render, get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserFiltersSerializer
from .models import UserFilters
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR

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


class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class CheckToken(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = get_object_or_404(Token, key=request.headers['Authorization'].split()[-1]).user
        result = user is not None
        return Response({'detail': result})


class GetUserData(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = Token.objects.get(key=request.headers.get('Authorization', '').split()[-1]).user
        user_data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_active': user.is_active,
        }
        return Response(user_data)


class UserFiltersView(ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = UserFilters.objects.all()
    serializer_class = UserFiltersSerializer

    def list(self, request, *args, **kwargs):
        queryset = UserFilters.objects.filter(user__id=request.user.id)
        ser = self.get_serializer(queryset, many=True)
        return Response(ser.data, status=200)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        filter = serializer.save(user=request.user)
        return Response({'result': True}, status=HTTP_201_CREATED)
    
    def delete(self, request, filter_id):
        try:
            filter = UserFilters.objects.get(id=filter_id, user=request.user)
            filter.delete()
            return Response({"result":True}, status=HTTP_204_NO_CONTENT)
        except UserFilters.DoesNotExist:
            return Response({"result":False, "errors":"Фильтр не найден"},status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"errors": str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)
