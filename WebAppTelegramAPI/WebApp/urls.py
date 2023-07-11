from django.urls import path, include
from rest_framework import routers
from .views import FilmViewSet, CategoryViewSet, FilmReviewApiView

routerFilm = routers.DefaultRouter()
routerFilm.register(r'films', FilmViewSet, basename='films')
routerCategory = routers.SimpleRouter()
routerCategory.register('category', CategoryViewSet)

urlpatterns = [
    path('films/<slug:slug>/reviews', FilmReviewApiView.as_view()),
    path('', include(routerFilm.urls)),
    path('', include(routerCategory.urls)),
]
