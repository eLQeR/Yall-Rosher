from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework import serializers
from shop.models import *


class VariantOfItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantOfItem
        fields = ("id", "size", "quantity", "color", "item")


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ("color", "hex")


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ("image",)


class ItemSerializer(serializers.ModelSerializer):
    images = GallerySerializer(many=True, read_only=False)
    sizes = VariantOfItemSerializer(many=True, read_only=False)
    colors = ColorSerializer(many=True, read_only=False)

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


class VariantOfItemDetailSerializer(serializers.ModelSerializer):
    color = ColorSerializer(many=False, read_only=True)

    class Meta:
        model = VariantOfItem
        fields = ("id", "size", "quantity", "color")


class ItemListSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = (
            "id",
            "name",
            "semi_category",
            "price",
            "images",
        )


class ItemDetailSerializer(ItemSerializer):
    colors = ColorSerializer(many=True, read_only=True)
    sizes = VariantOfItemDetailSerializer(many=True, read_only=True)


class SemiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiCategory
        fields = ("id", "name", "type", "category")


class ItemOrderSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(read_only=True, min_value=1, max_value=100)

    class Meta:
        model = VariantOfItem
        fields = ("id", "quantity")




class OrderSerializer(serializers.ModelSerializer):
    items = ItemOrderSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "address",
            "postal_code",
            "city",
            "created",
            "items"
        )

    def validate(self, attrs):
        data = super(OrderSerializer, self).validate(attrs=attrs)
        print(data)
        # Order.validate_order(
        #     data["items"], ValidationError
        # )
        return data

    # def create(self, validated_data):
    #     with transaction.atomic():
    #         items = validated_data.pop("items")
    #         order = Order.objects.create(**validated_data)
    #         order.items.add(items)
    #         order.save()
    #         return order


class OrderDetailSerializer(OrderSerializer):
    items = VariantOfItemSerializer(many=True, read_only=False)


class VariantOfItemListSerializer(serializers.ModelSerializer):
    color = ColorSerializer(many=False, read_only=True)
    images = GallerySerializer(many=True, read_only=False)

    class Meta:
        model = VariantOfItem
        fields = ("id", "size", "quantity", "color", "item", "images")
