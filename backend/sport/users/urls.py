from django.contrib import admin
from django.urls import path
from .views import UserViewSet
from rest_framework.authtoken import views

urlpatterns = [
    path('users/', UserViewSet.as_view({'get': 'list'})),
    path('users/create/', UserViewSet.as_view({'post': 'create'})),
    path('api-token-auth/', views.obtain_auth_token),

]