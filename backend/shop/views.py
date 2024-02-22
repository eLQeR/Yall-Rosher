from django.shortcuts import render
from rest_framework import viewsets

from .models import Cart, Item, SemiCategory
from .serializers import CartSerializer, SemiCategorySerializer, ItemSerializer, ItemListSerializer


class SemiCategoryViewSet(viewsets.ModelViewSet):
    queryset = SemiCategory.objects.all()
    serializer_class = SemiCategorySerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        return ItemSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
