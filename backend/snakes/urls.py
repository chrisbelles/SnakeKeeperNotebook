from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.get_snake_messages, name='snake_messages'),
    path('', views.user_snakes),
    path('all/', views.get_all_snakes),
    path('<int:pk>/', views.update_snake, name='update_snake'),
    path('feedings/', views.get_feedings, name='get_feedings'),
    path('feedings/<int:id>/', views.get_feedings, name='get_feeding'),
    path('feedings/add/', views.create_feeding),
    path('cleanings/', views.get_cleanings, name='get_cleanings'),
    path('cleanings/<int:id>/', views.get_cleanings, name='get_cleaning'),
    path('breeding-pairs/', views.breeding_pair_list, name='breeding_pair_list'),
    path('breeding-pairs/<int:id>/', views.breeding_pair_detail, name='breeding_pair_detail'),
    path('males/', views.males_list, name='male_list'),
    path('females/', views.female_list, name='female_list'),
]
