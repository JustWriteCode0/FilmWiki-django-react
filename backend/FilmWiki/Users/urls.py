from django.urls import path, include
from .views import UserProfileViewSet
from rest_framework.routers import DefaultRouter, SimpleRouter
from djoser.views import UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView


profileRouter = DefaultRouter()
userRouter = SimpleRouter()
profileRouter.register(r'profile', UserProfileViewSet, basename='profile')
userRouter.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(profileRouter.urls)),
    path('', include(userRouter.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]