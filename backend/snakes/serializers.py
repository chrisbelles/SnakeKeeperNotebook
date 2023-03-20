from rest_framework import serializers
from .models import Snake, Feeding, Cleaning, BreedingPair

class FeedingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feeding
        fields = ('last_fed', 'feeding_interval', 'next_feeding', 'marked_complete')
        depth = 1

class CleaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cleaning
        fields = ('last_cleaned', 'cleaning_interval', 'next_cleaning', 'marked_complete')
        depth = 1

class SnakeSerializer(serializers.ModelSerializer):
    feedings = FeedingSerializer(many=True, read_only=True)
    cleanings = CleaningSerializer(many=True, read_only=True)
    breeding_pair = serializers.StringRelatedField()

    class Meta:
        model = Snake
        fields = ('id', 'user', 'name', 'gender', 'age', 'weight', 'genetics', 'paired', 'needs_feeding', 'needs_cleaning', 'is_up_to_date', 'feedings', 'cleanings', 'breeding_pair')
        depth = 1

    def create(self, validated_data):
        feedings_data = validated_data.pop('feedings', [])
        cleanings_data = validated_data.pop('cleanings', [])
        snake = Snake.objects.create(**validated_data)
        for feeding_data in feedings_data:
            Feeding.objects.create(snake=snake, **feeding_data)
        for cleaning_data in cleanings_data:
            Cleaning.objects.create(snake=snake, **cleaning_data)
        return snake

    def update(self, instance, validated_data):
        feedings_data = validated_data.pop('feedings', [])
        cleanings_data = validated_data.pop('cleanings', [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        # update related feedings
        feeding_mapping = {feeding.id: feeding for feeding in instance.feeding_set.all()}
        for feeding_data in feedings_data:
            feeding_id = feeding_data.get('id', None)
            if feeding_id:
                feeding = feeding_mapping.pop(feeding_id)
                for key, value in feeding_data.items():
                    setattr(feeding, key, value)
                feeding.save()
            else:
                Feeding.objects.create(snake=instance, **feeding_data)
        for feeding in feeding_mapping.values():
            feeding.delete()
        # update related cleanings
        cleaning_mapping = {cleaning.id: cleaning for cleaning in instance.cleaning_set.all()}
        for cleaning_data in cleanings_data:
            cleaning_id = cleaning_data.get('id', None)
            if cleaning_id:
                cleaning = cleaning_mapping.pop(cleaning_id)
                for key, value in cleaning_data.items():
                    setattr(cleaning, key, value)
                cleaning.save()
            else:
                Cleaning.objects.create(snake=instance, **cleaning_data)
        for cleaning in cleaning_mapping.values():
            cleaning.delete()
        return instance
