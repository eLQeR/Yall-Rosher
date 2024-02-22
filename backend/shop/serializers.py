from rest_framework import serializers
from .models import *


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class ItemListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = "__all__"


class SemiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiCategory
        fields = "__all__"
