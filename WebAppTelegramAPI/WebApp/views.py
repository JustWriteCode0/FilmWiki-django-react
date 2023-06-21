from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, CategoryFilmSerializer
from .models import Film, CategoryFilm
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly  
from .permissions import CustomFilmPermission

class FilmApi(viewsets.ModelViewSet):
    
    queryset = Film.objects.all().order_by('film_name')
    serializer_class = FilmSerializer
    permission_classes = [CustomFilmPermission,]

class CategoryApi(viewsets.ModelViewSet):
    queryset = CategoryFilm.objects.all()
    serializer_class = CategoryFilmSerializer
    permission_classes = [CustomFilmPermission,]