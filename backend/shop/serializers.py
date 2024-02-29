from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *


class VariantOfItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantOfItem
        fields = "__all__"


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ("image",)


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    images = GallerySerializer(many=True, read_only=True)
    sizes = VariantOfItemSerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)

    class Meta:
        model = Item
        fields = (
            "id",
            "name",
            "semi_category",
            "article",
            "price",
            "colors",
            "sizes",
            "images",
        )


class ItemListSerializer(ItemSerializer):
    pass


class SemiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiCategory
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_staff")
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 5}
        }

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user
