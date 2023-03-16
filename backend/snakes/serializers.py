from rest_framework import serializers
from .models import Snake, Feeding, Cleaning, BreedingPair

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class SnakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snake
        fields = ['id', 'name', 'gender', 'age', 'weight', 'genetics', 'paired', 'is_up_to_date']
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

class BreedingPairSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreedingPair
        fields = '__all__'
        depth = 1