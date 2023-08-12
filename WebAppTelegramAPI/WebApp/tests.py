from django.urls import resolve
from django.test import TestCase
from WebApp.views import FilmViewSet

class TestFilmPage(TestCase):

    def test_film_page_path(self):
        found = resolve('/api/v1/films/')
        self.assertEqual(found.func, FilmViewSet)
    