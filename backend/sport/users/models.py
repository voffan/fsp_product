from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserFilters(models.Model):
    user = models.ForeignKey(User, verbose_name="Пользователь", db_index=True, null=False, on_delete=models.CASCADE)
    filter_str = models.CharField("Фильтры по видам спорта", max_length=500)