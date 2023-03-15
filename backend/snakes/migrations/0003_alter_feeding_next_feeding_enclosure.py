# Generated by Django 4.1.7 on 2023-03-15 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snakes', '0002_feeding'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feeding',
            name='next_feeding',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='Enclosure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_cleaned', models.DateField()),
                ('cleaning_interval', models.IntegerField(default=30)),
                ('next_cleaning', models.DateField()),
                ('snake', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='snakes.snake')),
            ],
        ),
    ]
