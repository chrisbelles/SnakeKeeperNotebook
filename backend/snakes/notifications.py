from datetime import datetime
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
from celery.schedules import crontab
from .models import Snake


@shared_task
def send_reminders():
    today = timezone.now().date()
    snakes_to_feed = Snake.objects.filter(next_feeding=today)
    snakes_to_clean = Snake.objects.filter(next_cleaning=today)

    for snake in snakes_to_feed:
        send_mail(
            'Reminder: Time to feed your snake!',
            f"Don't forget to feed {snake.name} today!",
            settings.DEFAULT_FROM_EMAIL,
            [snake.user.email],
            fail_silently=False,
        )

    for snake in snakes_to_clean:
        send_mail(
            'Reminder: Time to clean your snake!',
            f"Don't forget to clean {snake.name} today!",
            settings.DEFAULT_FROM_EMAIL,
            [snake.user.email],
            fail_silently=False,
        )

CELERY_BEAT_SCHEDULE = {
    'send_reminders': {
        'task': 'notifications.send_reminders',
        'schedule': crontab(hour=8, minute=0), # set to the time you want the reminders to be sent
    },
}
