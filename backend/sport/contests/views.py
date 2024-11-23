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

        if 'sporttype' in request.GET:
            self.queryset = self.queryset.filter(contestdiscipline__discipline__sport_type__id=request.GET['sporttype']).distinct()
        if 'discipline' in request.GET:
            self.queryset = self.queryset.filter(contestdiscipline__discipline__id=request.GET['discipline']).distinct()
        if 'contesttype' in request.GET:
            self.queryset = self.queryset.filter(contest_type__id=request.GET['contesttype'])
        if 'agestart' in request.GET:
            self.queryset = self.queryset.filter(contestcategory__category__age__start__gte=request.GET['agestart']).distinct()
        if 'ageend' in request.GET:
            self.queryset = self.queryset.filter(contestcategory__category__age__end__lte=request.GET['ageend']).distinct()
        # if 'gendergroup' in request.GET:
        #     self.queryset = self.queryset.filter(contestcategory__category__age__end__lte=request.GET['ageend']).distinct()
        if 'datestart' in request.GET:
            try:
                start = datetime.datetime.strptime(request.GET['datestart'], '%d%m%Y').date()
                self.queryset = self.queryset.filter(start__gte=start)
            except:
                return Response({'error': 'Формат даты начала периода задан неверно!'}, status=404)
        if 'dateend' in request.GET:
            try:
                end = datetime.datetime.strptime(request.GET['dateend'], '%d%m%Y').date()
                self.queryset = self.queryset.filter(end__lte=end)
            except:
                return Response({'error': 'Формат даты конца периода задан неверно!'}, status=404)
        
        ser = ContestSerializer(self.queryset, many=True)
        return Response(ser.data, status=200)


class ContestCategoryView(ModelViewSet):
    #permission_classes = [IsAuthenticated]

    queryset = ContestCategory.objects.all()
    serializer_class = ContestCategorySerializer