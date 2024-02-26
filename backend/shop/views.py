
from rest_framework import viewsets

from .models import Cart, Item, SemiCategory
from .serializers import SemiCategorySerializer, ItemSerializer, ItemListSerializer


class SemiCategoryViewSet(viewsets.ModelViewSet):
    queryset = SemiCategory.objects.all()
    serializer_class = SemiCategorySerializer

    def get_queryset(self):
        queryset = self.queryset
        category = self.request.query_params.get("category")

        if type:
            queryset = queryset.filter(category=category)
        return queryset


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        return ItemSerializer

    def get_queryset(self):
        queryset = self.queryset
        semi_category = self.request.query_params.get("category")

        if semi_category:
            queryset = queryset.filter(semi_category_id=semi_category)
        return queryset


# class CartViewSet(viewsets.ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer
