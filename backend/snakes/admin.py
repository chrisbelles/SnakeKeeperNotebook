from django.contrib import admin
from .models import Snake, Feeding, Cleaning, BreedingPair
from datetime import datetime,timezone
from django.utils import timezone


class FeedingAdmin(admin.ModelAdmin):
    list_display = ('id', 'snake', 'last_fed', 'feeding_interval', 'next_feeding', 'mark_feeding_completed')

    def mark_feeding_completed(self, obj):
        return obj.marked_complete

    mark_feeding_completed.boolean = True


class CleaningAdmin(admin.ModelAdmin):
    list_display = ('id', 'snake', 'last_cleaned', 'cleaning_interval', 'next_cleaning', 'mark_cleaning_completed')

    def mark_cleaning_completed(self, obj):
        return obj.marked_complete

    mark_cleaning_completed.boolean = True

class SnakeAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'gender', 'age', 'weight', 'genetics', 'paired', 'is_up_to_date')
    readonly_fields = ('is_up_to_date',)

    def is_up_to_date(self, obj):
        if obj.paired:
            return False

        if obj.needs_feeding or obj.needs_cleaning:
            return False

        last_feeding = None
        last_cleaning = None

        try:
            last_feeding = obj.feeding_set.latest('last_fed')
        except Feeding.DoesNotExist:
            pass

        try:
            last_cleaning = obj.cleaning_set.latest('last_cleaned')
        except Cleaning.DoesNotExist:
            pass

        if last_feeding and last_cleaning and last_feeding.marked_complete and last_cleaning.marked_complete:
            return True

        return False

    is_up_to_date.boolean = True
    is_up_to_date.short_description = 'Up-to-date'



class BreedingPairAdmin(admin.ModelAdmin):
    list_display = ('male', 'female', 'is_paired', 'start_date', 'end_date')

    def is_paired(self, obj):
        return obj.male.paired and obj.female.paired

    is_paired.boolean = True
    is_paired.short_description = 'Paired'

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            obj.delete()



admin.site.register(Snake, SnakeAdmin)
admin.site.register(Feeding, FeedingAdmin)
admin.site.register(Cleaning, CleaningAdmin)
admin.site.register(BreedingPair, BreedingPairAdmin)