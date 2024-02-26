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
