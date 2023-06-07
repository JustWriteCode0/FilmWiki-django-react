from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, CategoryFilmSerializer
from .models import Film, CategoryFilm
from rest_framework.permissions import IsAuthenticated


class FilmApi(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


class CategoryApi(viewsets.ModelViewSet):
    queryset = CategoryFilm.objects.all()
    serializer_class = CategoryFilmSerializer
    permission_classes = (IsAuthenticated, )