import datetime
from django.shortcuts import render
from .models import SportType, Discipline, ContestType, AgeGroup, GenderGroup, Category, Contest, ContestCategory
from .serializers import SportTypeSerializer, DisciplineSerializer, ContestTypeSerializer, AgeGroupSerializer, GenderGroupSerializer, CategorySerializer, ContestSerializer, ContestCategorySerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.

class SportTypeView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = SportType.objects.all()
    serializer_class = SportTypeSerializer
    

class DisciplineView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = Discipline.objects.all()
    serializer_class = DisciplineSerializer

    def get_disciplines_by_sport_type(self, request, sport_type_id=None):
        disciplines = Discipline.objects.filter(sport_type_id=sport_type_id)
        serializer = self.get_serializer(disciplines, many=True)
        return Response(serializer.data, status=200)

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

    def get_filter_data(self, request):
        try:
            start = datetime.datetime.strptime(request.GET['start'], '%d%m%Y').date() if 'start' in request.GET else datetime.date(1900, 1, 1)
            if 'end' not in request.GET:
                return Response({'error': 'Дата конца периода не задана'}, status=404)
            end = datetime.datetime.strptime(request.GET['end'], '%d%m%Y').date()
        except:
            return Response({'error': 'Формат даты задан неверно!'}, status=404)
        contests = Contest.objects.filter(start__gte=start, end__lt=end)
        ser = ContestSerializer(contests, many=True)
        return Response(ser.data, status=200)


class ContestCategoryView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = ContestCategory.objects.all()
    serializer_class = ContestCategorySerializer