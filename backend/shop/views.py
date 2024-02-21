from django.shortcuts import render
from rest_framework import viewsets

from .models import Category, Cart, Item, SemiCategory
from .serializers import CategorySerializer, CartSerializer, SemiCategorySerializer, ItemSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SemiCategoryViewSet(viewsets.ModelViewSet):
    queryset = SemiCategory.objects.all()
    serializer_class = SemiCategorySerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
