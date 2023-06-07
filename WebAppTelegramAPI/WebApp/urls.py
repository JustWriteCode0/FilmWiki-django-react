from django.urls import path, include
from rest_framework import routers
from .views import FilmApi, CategoryApi

routerFilm = routers.SimpleRouter()
routerFilm.register('film', FilmApi)
routerCategory = routers.SimpleRouter()
routerCategory.register('category', CategoryApi)

urlpatterns = [
    path('', include(routerFilm.urls)),
    path('', include(routerCategory.urls)),
]
