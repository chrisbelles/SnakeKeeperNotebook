from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.get_snake_messages, name='snake_messages'),
    path('', views.user_snakes),
    path('all/', views.get_all_snakes),
    path('<int:pk>/', views.update_snake, name='update_snake'),
    path('feedings/', views.get_feedings, name='get_feedings'),
    path('cleanings/', views.get_cleanings, name='get_cleanings'),
]
