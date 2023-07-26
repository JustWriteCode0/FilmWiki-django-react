from django.urls import path
from .views import CustomUserAPIView

urlpatterns = [
    path('authorization/', CustomUserAPIView.as_view(), name='authorization'),
]