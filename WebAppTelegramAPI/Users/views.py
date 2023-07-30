from .serializers import UserProfileSerializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import CustomUser


class UserProfileViewSet(ReadOnlyModelViewSet):
    permission_classes = []
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer