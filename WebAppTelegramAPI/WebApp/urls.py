from django.urls import path, include
from rest_framework import routers
from .views import FilmViewSet, CategoryViewSet, FilmReviewCreateView, FilmReviewListView

routerFilm = routers.DefaultRouter()
routerFilm.register(r'films', FilmViewSet, basename='films')
routerCategory = routers.SimpleRouter()
routerCategory.register('category', CategoryViewSet)

urlpatterns = [
    path('films/<slug:slug>/reviews/', FilmReviewListView.as_view(), name='film-review-list'),
    path('films/<slug:slug>/reviews/create/', FilmReviewCreateView.as_view(), name='film-review-create'),
    path('', include(routerFilm.urls)),
    path('', include(routerCategory.urls)),
]
