from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserFilters(models.Model):
    user = models.ForeignKey(User, verbose_name="Пользователь", db_index=True, null=False, on_delete=models.CASCADE)
    sport_type = models.CharField("Фильтры по видам спорта", max_length=250)
    discipline = models.CharField("Фильтры по дисциплинам", max_length=250)
    program = models.CharField("Фильтры по спортивной программе", max_length=250)
    place = models.CharField("Фильтры месту проведения", max_length=250)
    contestants_min = models.IntegerField("Фильтры по количеству участников мин")
    contestants_max = models.IntegerField("Фильтры по количеству участников макс")
    gender = models.CharField("Пол", max_length=250)
    age = models.CharField("Фильтры по возрастной группе", max_length=250)
    start_date = models.DateField("Фильтр по началу соревнования")
    end_date = models.DateField("Фльтр по окончанию соревнования")
    contest_type = models.CharField("Фильтры по уровню соревнования", max_length=250)