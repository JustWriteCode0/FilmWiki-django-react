from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('FilmWikiAPI.urls')),
    path('auth/', include('djoser.urls')),
    path('users/', include('Users.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
