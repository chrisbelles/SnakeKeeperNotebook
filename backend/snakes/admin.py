from django.contrib import admin
from .models import Snake, Feeding, Cleaning, BreedingPair
from datetime import datetime,timezone
from django.utils import timezone


class FeedingAdmin(admin.ModelAdmin):
    list_display = ('snake', 'last_fed', 'feeding_interval', 'next_feeding', 'mark_feeding_completed')

    def mark_feeding_completed(self, obj):
        if obj.next_feeding == datetime.now().date():
            return True
        else:
            return False

    mark_feeding_completed.boolean = True


class CleaningAdmin(admin.ModelAdmin):
    list_display = ('snake', 'last_cleaned', 'cleaning_interval', 'next_cleaning', 'mark_cleaning_completed')

    def mark_cleaning_completed(self, obj):
        if obj.next_cleaning == datetime.now().date():
            return True
        else:
            return False

    mark_cleaning_completed.boolean = True


class SnakeAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'gender', 'age', 'weight', 'genetics', 'paired', 'is_up_to_date')
    readonly_fields = ('is_up_to_date',)

    def is_up_to_date(self, obj):
        return not obj.paired and obj.needs_feeding() and obj.needs_cleaning()

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