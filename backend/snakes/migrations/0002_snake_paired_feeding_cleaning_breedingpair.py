# Generated by Django 4.1.7 on 2023-03-15 20:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snakes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='snake',
            name='paired',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='Feeding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_fed', models.DateField()),
                ('feeding_interval', models.IntegerField()),
                ('next_feeding', models.DateField(blank=True, null=True)),
                ('snake', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='snakes.snake')),
            ],
        ),
        migrations.CreateModel(
            name='Cleaning',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_cleaned', models.DateField()),
                ('cleaning_interval', models.IntegerField(default=30)),
                ('next_cleaning', models.DateField(blank=True, null=True)),
                ('snake', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='snakes.snake')),
            ],
        ),
        migrations.CreateModel(
            name='BreedingPair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('female', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='breeding_pairs_as_female', to='snakes.snake')),
                ('male', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='breeding_pairs_as_male', to='snakes.snake')),
            ],
        ),
    ]
