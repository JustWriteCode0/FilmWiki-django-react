from django.shortcuts import render
from rest_framework import viewsets
from .serializers import FilmSerializer, FilmCategoriesSerializer, FilmImageSerializer, FilmCatalogSerializer, ReviewSerializer
from .models import Film, FilmCategories, Actor, FilmImage, FilmReview
from rest_framework.permissions import IsAuthenticated, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly  
from .permissions import CustomFilmPermission
from .paginations import ReviewsPagination, FilmCatalogPagination
from rest_framework.generics import ListAPIView, CreateAPIView
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework import filters


class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    permission_classes = [CustomFilmPermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ['film_name',]
    pagination_class = FilmCatalogPagination
    
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


class FilmReviewListView(ListAPIView):
    queryset = FilmReview.objects.all().order_by('-id')
    serializer_class = ReviewSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    pagination_class = ReviewsPagination

    def get_queryset(self):
        slug = self.kwargs['slug']
        return self.queryset.filter(film__slug_film_name=slug)

class FilmReviewCreateView(CreateAPIView):
    queryset = FilmReview.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated,]

    def perform_create(self, serializer):
        slug = self.kwargs['slug']
        film = Film.objects.get(slug_film_name=slug)
        serializer.save(film=film, user=self.request.user)