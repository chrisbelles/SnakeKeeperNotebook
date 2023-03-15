from rest_framework import serializers
from .models import Snake, Feeding, Cleaning

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class SnakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snake
        fields = ['id', 'name', 'gender', 'age', 'weight', 'genetics']
        depth = 1

class FeedingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feeding
        fields = '__all__'
        depth = 1

class CleaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cleaning
        fields = '__all__'
        depth = 1