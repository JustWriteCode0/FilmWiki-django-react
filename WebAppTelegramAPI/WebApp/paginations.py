from rest_framework.pagination import PageNumberPagination


class ReviewsPagination(PageNumberPagination):
    page_size = 15


class FilmCatalogPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 50
