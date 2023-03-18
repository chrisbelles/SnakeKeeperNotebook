from rest_framework import serializers
from .models import Snake, Feeding, Cleaning, BreedingPair

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class SnakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snake
        fields = ['id', 'name', 'gender', 'age', 'weight', 'genetics', 'paired', 'is_up_to_date']
        depth = 1

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.genetics = validated_data.get('genetics', instance.genetics)
        instance.paired = validated_data.get('paired', instance.paired)
        instance.save()
        return instance

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