from django.contrib import admin
from .models import  FilmCategory, Film, Actor, FilmImage, FilmReview


admin.site.register(Film)
admin.site.register(FilmCategory)
admin.site.register(FilmImage)
admin.site.register(Actor)
admin.site.register(FilmReview)