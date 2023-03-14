from django.db import models
from authentication.models import User

# Create your models here.

class Snake(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=100)
    age = models.IntegerField()
    
# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


# class Car(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     make = models.CharField(max_length=30)
#     model = models.CharField(max_length=100)
#     year = models.IntegerField()
