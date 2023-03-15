from django.db import models
from authentication.models import User
from django.utils import timezone

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
    next_feeding = models.DateField()

    # def calculate_next_feeding(self):
    #     if self.last_fed and self.feeding_interval:
    #         days = timezone.now() - self.last_fed
    #         days_since_last_fed = days.days
    #         days_until_next_feeding = self.feeding_interval - days_since_last_fed
    #         if days_until_next_feeding < 0:
    #             self.next_feeding = timezone.now()
    #         else:
    #             self.next_feeding = timezone.now() + timezone.timedelta(days=days_until_next_feeding)
    #     else:
    #         self.next_feeding = None

    # def save(self, *args, **kwargs):
    #     self.calculate_next_feeding()
    #     super().save(*args, **kwargs)