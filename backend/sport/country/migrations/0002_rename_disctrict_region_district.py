# Generated by Django 5.1.3 on 2024-11-23 02:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('country', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='region',
            old_name='disctrict',
            new_name='district',
        ),
    ]
