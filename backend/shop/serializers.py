from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

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


class VariantOfItemDetailSerializer(serializers.ModelSerializer):
    color = ColorSerializer(many=False, read_only=True)
    item = ItemListSerializer(many=False, read_only=True)

    class Meta:
        model = VariantOfItem
        fields = ("id", "size", "quantity", "color", "item")


class ItemDetailSerializer(ItemSerializer):
    colors = ColorSerializer(many=True, read_only=True)
    sizes = VariantOfItemDetailSerializer(many=True, read_only=True)


class SemiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SemiCategory
        fields = ("id", "name", "type", "category")


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "variant_of_item", "quantity")

        def validate(self, attrs):
            data = super(OrderItemSerializer, self).validate(attrs=attrs)
            item = data["variant_of_item"]
            quantity = data["quantity"]
            if not (0 < quantity <= item.quantity):
                raise ValidationError(
                    code=400,
                    detail="Quantity must be between 1 and " + str(item.quantity)
                )

            return data


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(
        many=True,
        read_only=False,
    )

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
        Order.validate_order(
            data["items"], ValidationError
        )
        return data

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        if not items_data:
            raise ValidationError(code=400, detail="No items provided")
        with transaction.atomic():
            order = Order.objects.create(**validated_data)

            for item_data in items_data:
                item = item_data["variant_of_item"]
                quantity = item_data["quantity"]
                item.quantity -= quantity
                item.save()
                OrderItem.objects.create(order=order, **item_data)
                order.cost = order.get_total_cost()
                order.save()
            return order


class OrderListSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source="items.first.images.first.image", read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "address",
            "postal_code",
            "city",
            "created",
            "is_canceled",
            "cost",
            "image",
        )


class OrderDetailSerializer(OrderListSerializer):
    items = VariantOfItemDetailSerializer(many=True, read_only=False)

    class Meta:
        model = Order
        fields = (
            "id",
            "address",
            "postal_code",
            "city",
            "created",
            "is_canceled",
            "cost",
            "image",
            "items",
        )


class VariantOfItemListSerializer(serializers.ModelSerializer):
    color = ColorSerializer(many=False, read_only=True)
    images = GallerySerializer(many=True, read_only=False)

    class Meta:
        model = VariantOfItem
        fields = ("id", "size", "quantity", "color", "item", "images")
