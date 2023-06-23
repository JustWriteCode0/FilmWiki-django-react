from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, CategoryFilmSerializer
from .models import Film, CategoryFilm
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly  
from .permissions import CustomFilmPermission
from rest_framework.decorators import action
from rest_framework.response import Response


class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    permission_classes = [CustomFilmPermission,]
    lookup_field='slug_film_name'

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = CategoryFilm.objects.all()
    serializer_class = CategoryFilmSerializer
    permission_classes = [CustomFilmPermission,]
    