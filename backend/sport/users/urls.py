from django.contrib import admin
from django.urls import path
from .views import UserViewSet, CheckToken, GetUserData, UserProfile, UserFiltersView
from rest_framework.authtoken import views

urlpatterns = [
    path('users/', UserViewSet.as_view({'get': 'list'})),
    path('users/create/', UserViewSet.as_view({'post': 'create'})),
    path('api-token-auth/', views.obtain_auth_token),
    path('check-token/', CheckToken.as_view()),
    path('get-user/', GetUserData.as_view()),
    path('profile/', UserProfile.as_view()),
    path('filters/', UserFiltersView.as_view({'get': 'list'})),
    path('filters/create/', UserFiltersView.as_view({'post': 'create'})),
    path('filters/delete/<int:filter_id>/', UserFiltersView.as_view({'delete': 'delete'})),
]