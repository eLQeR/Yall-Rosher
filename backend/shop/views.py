from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework import viewsets, generics, mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from shop.models import Item, SemiCategory, Order, VariantOfItem, OrderItem
from shop.permissions import IsAdminOrReadOnly
from shop.serializers import (
    SemiCategorySerializer,
    ItemSerializer,
    ItemListSerializer,
    OrderSerializer,
    VariantOfItemDetailSerializer,
    VariantOfItemSerializer,
    ItemDetailSerializer,
    VariantOfItemListSerializer, OrderDetailSerializer, OrderListSerializer,
)


class SemiCategoryViewSet(viewsets.ModelViewSet):
    queryset = SemiCategory.objects.all()
    serializer_class = SemiCategorySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = self.queryset
        category = self.request.query_params.get("category")

        if category:
            queryset = queryset.filter(category=category)
        return queryset


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        if self.action == "retrieve":
            return ItemDetailSerializer

        return ItemSerializer

    def get_queryset(self):

        queryset = self.queryset
        semi_category = self.request.query_params.get("category")

        if semi_category:
            queryset = queryset.filter(semi_category_id=semi_category)
        return queryset


class VariantOfItemViewSet(viewsets.ModelViewSet):
    queryset = VariantOfItem.objects.all()
    serializer_class = VariantOfItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.action == "list":
            return VariantOfItemListSerializer
        if self.action == "retrieve":
            return VariantOfItemSerializer

        return VariantOfItemSerializer

    @extend_schema(
        summary="Get list of variants of items",
        description="User can get a list of variants of items.",
        methods=["GET"],
        parameters=[
            OpenApiParameter(
                name="item",
                description="Filter by id of item",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="color",
                description="Filter by id of color",
                required=False,
                type=str
            ),
            OpenApiParameter(
                name="size",
                description="Filter by size",
                required=False,
                type=str
            ),
        ],
        examples=[
            OpenApiExample(
                "Example 1",
                value={
                    "item": 4,
                    "color": 3,
                    "size": "XXL",
                }
            )
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = self.queryset
        item_id = self.request.query_params.get("item")
        color_id = self.request.query_params.get("color")
        size = self.request.query_params.get("size")

        if item_id:
            queryset = queryset.filter(item_id=item_id)
        if color_id:
            queryset = queryset.filter(color_id=color_id)
        if item_id:
            queryset = queryset.filter(size=size)

        return queryset


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['POST'], url_path="cancel-order")
    def cancel_order(self, request, pk=None):
        order = self.get_object()
        order.is_canceled = True
        order.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['GET'], url_path="get-cost")
    def get_cost(self, request, pk=None):
        order = self.get_object()
        return Response({"cost": order.get_total_cost}, status=status.HTTP_200_OK)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return OrderDetailSerializer
        if self.action == 'list':
            return OrderListSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
