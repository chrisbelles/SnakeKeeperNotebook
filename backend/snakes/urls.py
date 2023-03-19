from django.urls import path
from . import views

urlpatterns = [
    path('messages/', views.get_snake_messages, name='snake_messages'),
    path('', views.user_snakes),
    path('all/', views.get_all_snakes),
    # path('<int:pk>/', views.delete_snake, name='delete_snake'),
    path('snakes/<int:pk>/', views.update_snake, name='update_snake'),
]
