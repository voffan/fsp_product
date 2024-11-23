# Generated by Django 5.1.3 on 2024-11-23 17:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('country', '0003_alter_region_district'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='region',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='country.region', verbose_name='Населенный пункт'),
        ),
    ]
