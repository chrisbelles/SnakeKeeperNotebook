# Generated by Django 4.1.7 on 2023-03-21 04:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snakes', '0008_snake_is_up_to_date_snake_needs_cleaning_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='snake',
            name='is_up_to_date',
        ),
    ]
