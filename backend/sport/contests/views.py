from django.shortcuts import render
from .models import SportType, Discipline, ContestType, AgeGroup, GenderGroup, Category, Contest, ContestCategory
from .serializers import SportTypeSerializer, DisciplineSerializer, ContestTypeSerializer, AgeGroupSerializer, GenderGroupSerializer, CategorySerializer, ContestSerializer, ContestCategorySerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class SportTypeView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer

class DisciplineView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer

class ContestTypeView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = ContestType.objects.all()
    serializer_class = ContestTypeSerializer

class AgeGroupView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = AgeGroup.objects.all()
    serializer_class = AgeGroupSerializer

class GenderGroupView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = GenderGroup.objects.all()
    serializer_class = GenderGroupSerializer

class CategoryView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ContestView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = Contest.objects.all()
    serializer_class = ContestSerializer

class ContestCategoryView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = ContestCategory.objects.all()
    serializer_class = ContestCategorySerializer