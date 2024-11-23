from django.contrib import admin
from .models import SportType, Discipline, ContestType, AgeGroup, GenderGroup, Category, Contest, ContestCategory
# Register your models here.

admin.site.register(SportType)
admin.site.register(Discipline)
admin.site.register(ContestType)
admin.site.register(AgeGroup)
admin.site.register(GenderGroup)
admin.site.register(Category)
admin.site.register(Contest)
admin.site.register(ContestCategory)