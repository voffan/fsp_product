from django.db import models
from django.contrib.auth.models import User
from contests.models import Contest

# Create your models here.

class Subscription(models.Model):
    user = models.ForeignKey(User, verbose_name="Пользователь", db_index=True, null=False, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, verbose_name="Соревнование", db_index=True, null=False, on_delete=models.CASCADE)
