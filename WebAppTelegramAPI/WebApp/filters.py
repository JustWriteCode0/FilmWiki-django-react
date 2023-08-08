import django_filters
from .models import Film

class FilmCatalogFilter(django_filters.FilterSet):
    film_name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        models = Film
        fields = []