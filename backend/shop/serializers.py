from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class SemiCategorySerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="type.name")

    class Meta:
        model = SemiCategory
        fields = "__all__"
