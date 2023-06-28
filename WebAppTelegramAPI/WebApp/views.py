from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, FilmCategoriesSerializer, ActorSerializer, FilmImageSerializer
from .models import Film, FilmCategories, Actor, FilmImage
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
    queryset = FilmCategories.objects.all()
    serializer_class = FilmCategoriesSerializer
    permission_classes = [CustomFilmPermission,]


class FilmImagesViewSet(viewsets.ModelViewSet):
    queryset = FilmImage.objects.all()
    serializer_class = FilmImageSerializer
    permission_classes = [IsAdminUser,]


class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    permission_classes = [CustomFilmPermission,]