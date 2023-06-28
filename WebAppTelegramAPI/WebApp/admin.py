from django.contrib import admin
from .models import  FilmCategories, Film, Actor, FilmImage


admin.site.register(Film)
admin.site.register(FilmCategories)
admin.site.register(FilmImage)
admin.site.register(Actor)
