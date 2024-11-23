from rest_framework import serializers
from .models import Country, District, Region, City


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['name']


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['name']


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['district', 'name']


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['region', 'name']