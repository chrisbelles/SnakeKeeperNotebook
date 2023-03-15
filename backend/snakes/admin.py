from django.contrib import admin
from .models import Snake, Feeding, Cleaning, BreedingPair

# Register your models here.
admin.site.register(Snake)
admin.site.register(Feeding)
admin.site.register(Cleaning)
admin.site.register(BreedingPair)
