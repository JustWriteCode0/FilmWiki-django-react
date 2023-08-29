from rest_framework.permissions import BasePermission, SAFE_METHODS


class CustomFilmPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            # Allow read-only access for all users
            return True
        
        # Check if the user is an admin
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            # Allow read-only access for all users
            return True
        
        # Check if the user is an admin
        return request.user.is_superuser
