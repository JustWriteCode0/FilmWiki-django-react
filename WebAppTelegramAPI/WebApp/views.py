from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, FilmCategoriesSerializer, ActorSerializer, FilmImageSerializer, FilmCatalogSerializer, ReviewSerializer
from .models import Film, FilmCategories, Actor, FilmImage, FilmReview
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly  
from .permissions import CustomFilmPermission
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    permission_classes = [CustomFilmPermission,]
    lookup_field='slug_film_name'

    def get_serializer_class(self):
        if self.action == 'retrieve':  # Check if the action is for retrieving a single film
            return FilmSerializer
        return FilmCatalogSerializer

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


class FilmReviewApiView(APIView):
    def post(self, request, slug):
        film = Film.objects.get(slug_film_name=slug)
        print(film)
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(film=film)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, slug):
        film = Film.objects.get(slug_film_name=slug)
        print(film.id)
        reviews = FilmReview.objects.filter(film=film.id)
        serializer = ReviewSerializer(data=reviews, many=True)
        serializer.is_valid()
        return Response(serializer.data)