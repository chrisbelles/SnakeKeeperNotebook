from django.db import models
from authentication.models import User
from django.utils import timezone
from datetime import datetime, timedelta


class Snake(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)
    age = models.IntegerField()
    weight = models.IntegerField()
    genetics = models.CharField(max_length=100)


class Feeding(models.Model):
    snake = models.ForeignKey(Snake, on_delete=models.CASCADE)
    last_fed = models.DateField()
    feeding_interval = models.IntegerField()
    next_feeding = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        last_fed_datetime = timezone.make_aware(datetime.combine(self.last_fed, datetime.min.time()))
        days = (timezone.now() - last_fed_datetime).days
        next_feeding_datetime = last_fed_datetime + timedelta(days=self.feeding_interval)
        self.next_feeding = next_feeding_datetime.date()
        super().save(*args, **kwargs)


class Cleaning(models.Model):
    snake = models.ForeignKey(Snake, on_delete=models.CASCADE)
    last_cleaned = models.DateField()
    cleaning_interval = models.IntegerField(default=30)
    next_cleaning = models.DateField(blank=True, null=True)

    def calculate_next_cleaning(self):
        last_cleaned_datetime = timezone.make_aware(datetime.combine(self.last_cleaned, datetime.min.time()))
        next_cleaning_datetime = last_cleaned_datetime + timedelta(days=self.cleaning_interval)
        self.next_cleaning = next_cleaning_datetime.date()

    def save(self, *args, **kwargs):
        self.calculate_next_cleaning()
        super().save(*args, **kwargs)
