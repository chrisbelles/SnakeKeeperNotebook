# Generated by Django 4.1.7 on 2023-03-15 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snakes', '0002_snake_paired_feeding_cleaning_breedingpair'),
    ]

    operations = [
        migrations.AddField(
            model_name='breedingpair',
            name='is_paired',
            field=models.BooleanField(default=False),
        ),
    ]