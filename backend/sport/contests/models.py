from django.db import models
from country.models import City, Country

# Create your models here.

class SportType(models.Model):
    name = models.CharField(verbose_name="Вид спорта", max_length=250)
    #code = models.CharField(verbose_name="Вид спорта", max_length=250)

    def __str__(self):
        return self.name


class Discipline(models.Model):
    sport_type = models.ForeignKey(SportType, verbose_name="Вид спорта", db_index=True, null=False, on_delete=models.CASCADE)
    name = models.CharField(verbose_name="Вид спорта", max_length=250)

    def __str__(self):
        return self.name


class ContestType(models.Model):
    name = models.CharField(verbose_name="Уровень соревнования", max_length=250)

    def __str__(self):
        return self.name


class AgeGroup(models.Model):
    start = models.IntegerField(verbose_name="Нижний порог")
    end = models.IntegerField(verbose_name="Верхний порог")

    def __str__(self):
        return str(self.start) + '-' + str(self.end)


class GenderGroup(models.Model):
    name = models.CharField(verbose_name="Наименование", max_length=250)

    def __str__(self):
        return self.name


class Category(models.Model):
    gender = models.ForeignKey(GenderGroup, verbose_name="Гендерная категория", db_index=True, null=False, on_delete=models.CASCADE)
    age = models.ForeignKey(AgeGroup, verbose_name="Возрастная категория", db_index=True, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.gender.name + ' ' + str(self.age)


class Contest(models.Model):
    program = models.CharField(verbose_name="Программа", max_length=250)
    code = models.CharField(verbose_name="Rод", max_length=250)
    start = models.DateField(verbose_name="Дата начала")
    end = models.DateField(verbose_name="Дата окончания")
    place = models.ForeignKey(City, verbose_name="Город проведения", db_index=True, null=True, on_delete=models.SET_NULL)
    country = models.ForeignKey(Country, verbose_name="Страна проведения", db_index=True, null=True, on_delete=models.SET_NULL)
    contestants = models.IntegerField(verbose_name="Верхний порог")
    contest_type = models.ForeignKey(ContestType, verbose_name="Уровень соревнования", db_index=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.program


class ContestCategory(models.Model):
    contest = models.ForeignKey(ContestType, verbose_name="Cоревнование", db_index=True, null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(Category, verbose_name="Категория", db_index=True, null=True, on_delete=models.SET_NULL)
    
    def __str__(self):
        return str(self.contest) + ' ' + str(self.category)
