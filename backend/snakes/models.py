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
    paired = models.BooleanField(default=False)

    @property
    def breeding_pair(self):
        pairs = BreedingPair.objects.filter(models.Q(male=self) | models.Q(female=self))
        if pairs.exists():
            return pairs[0]
        else:
            return None

    def needs_feeding(self):
        try:
            last_feeding = self.feeding_set.latest('last_fed')
            return last_feeding.next_feeding == datetime.now().date()
        except Feeding.DoesNotExist:
            return False

    def needs_cleaning(self):
        try:
            last_cleaning = self.cleaning_set.latest('last_cleaned')
            return last_cleaning.next_cleaning == datetime.now().date()
        except Cleaning.DoesNotExist:
            return False
        
    def __str__(self):
            return self.name

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

    def __str__(self):
        return f'{self.snake.name} - Last Fed: {self.last_fed.strftime("%m/%d/%Y")} - Next Feeding: {self.next_feeding.strftime("%m/%d/%Y")}'


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

    def __str__(self):
        return f"{self.snake.name}'s cleaning schedule"

class BreedingPair(models.Model):
    male = models.ForeignKey(Snake, on_delete=models.CASCADE, related_name='breeding_pairs_as_male')
    female = models.ForeignKey(Snake, on_delete=models.CASCADE, related_name='breeding_pairs_as_female')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def is_paired(self):
        return self.male.paired and self.female.paired
    is_paired.boolean = True
    is_paired.short_description = 'Paired'

    def save(self, *args, **kwargs):
        # set paired field to True for both male and female snakes
        self.male.paired = True
        self.female.paired = True
        self.male.save()
        self.female.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # unset paired field for both male and female snakes
        self.male.paired = False
        self.female.paired = False
        self.male.save()
        self.female.save()
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.male.name} and {self.female.name} ({self.start_date} - {self.end_date})"
