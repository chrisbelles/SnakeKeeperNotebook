from django.urls import path, include
from snakes import views



urlpatterns = [
    path('', views.user_snakes),
    path('all/', views.get_all_snakes),
]
