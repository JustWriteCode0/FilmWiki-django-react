from rest_framework import serializers
from .models import CustomUser



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'avatar']

        # Make the password write-only and don't include it when reading
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        avatar = validated_data.pop('avatar', None)
        user = CustomUser.objects.create(**validated_data)
        if avatar:
            user.avatar = avatar
        user.save()
        return user

    def update(self, instance, validated_data):
        avatar = validated_data.pop('avatar', None)
        instance = super().update(instance, validated_data)
        if avatar:
            instance.avatar = avatar
            instance.save()
        return instance
