from django.urls import path, include
from rest_framework import routers
from .views import FilmViewSet, CategoryViewSet

routerFilm = routers.DefaultRouter()
routerFilm.register(r'films', FilmViewSet, basename='films')
routerCategory = routers.SimpleRouter()
routerCategory.register('category', CategoryViewSet)

urlpatterns = [
    path('', include(routerFilm.urls)),
    path('', include(routerCategory.urls)),
]
