from django.core.exceptions import FieldError
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    OpenApiExample,
    extend_schema_view,
)
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import ValidationError

from shop.models import Item, SemiCategory, Order, VariantOfItem, OrderItem
from shop.permissions import IsAdminOrReadOnly, CanCancelOrCreateOrGet
from shop.serializers import (
    SemiCategorySerializer,
    ItemSerializer,
    ItemListSerializer,
    OrderSerializer,
    VariantOfItemSerializer,
    ItemDetailSerializer,
    VariantOfItemListSerializer,
    OrderDetailSerializer,
    OrderListSerializer,
    ItemCreateUpdateSerializer,
)


@extend_schema_view(
    list=extend_schema(
        summary="Get list of your semi categories",
        description="User can get a list of semi categories.",
    ),
    retrieve=extend_schema(
        summary="Get a certain semi category",
        description="User can get a certain semi category.",
    ),
    create=extend_schema(
        summary="Create a certain semi category",
        description="Admin can create a semi category.",
    ),
    update=extend_schema(
        summary="Update a certain semi category",
        description="Admin can update a semi category.",
    ),
    partial_update=extend_schema(
        summary="Partial update a certain semi category",
        description="Admin can make partial update a semi category.",
    ),
    destroy=extend_schema(
        summary="Delete a certain semi category",
        description="Admin can delete a semi category.",
    ),
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


class MediumResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 20


@extend_schema_view(
    list=extend_schema(
        summary="Get list of your items",
        description="User can get a list of items.",
    ),
    retrieve=extend_schema(
        summary="Get a certain item",
        description="User can get a certain item.",
    ),
    create=extend_schema(
        summary="Create a certain item",
        description="Admin can create an item.",
    ),
    update=extend_schema(
        summary="Update a certain item",
        description="Admin can update an item.",
    ),
    partial_update=extend_schema(
        summary="Partial update a certain item",
        description="Admin can make partial update an item.",
    ),
    destroy=extend_schema(
        summary="Delete a certain item",
        description="Admin can delete an item.",
    ),
)
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = MediumResultsSetPagination

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        if self.action == "retrieve":
            return ItemDetailSerializer
        return ItemCreateUpdateSerializer

    def get_queryset(self):

        queryset = self.queryset
        name = self.request.query_params.get("name")
        semi_category = self.request.query_params.get("category")
        ordering = self.request.query_params.get("ordering")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if semi_category:
            queryset = queryset.filter(semi_category_id=semi_category)

        if self.action == "list":
            queryset = queryset.prefetch_related("images")

        if ordering:
            try:
                queryset = queryset.order_by(ordering)
            except FieldError:
                raise ValidationError(code=400, detail="Invalid ordering")
        return queryset

    @extend_schema(
        summary="Get list of items",
        description="User can get a list of items that are available.",
        methods=["GET"],
        parameters=[
            OpenApiParameter(
                name="category",
                description="Filter by id of semi-category.",
                required=False,
                type=str,
            ),
            OpenApiParameter(
                name="name", description="Filter by name", required=False, type=str
            ),
            OpenApiParameter(
                name="ordering", description="Ordering items", required=False, type=str
            ),
        ],
        examples=[
            OpenApiExample(
                "Example 1",
                value={
                    "category": 4,
                    "name": "Світшот",
                },
            )
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


@extend_schema_view(
    retrieve=extend_schema(
        summary="Get a certain variant of item",
        description="User can get a certain variant of item.",
    ),
    create=extend_schema(
        summary="Create a certain variant of item",
        description="Admin can create a variant of item.",
    ),
    update=extend_schema(
        summary="Update a certain variant of item",
        description="Admin can update a variant of item.",
    ),
    partial_update=extend_schema(
        summary="Partial update a certain variant of item",
        description="Admin can make partial update a variant of item.",
    ),
    destroy=extend_schema(
        summary="Delete a certain variant of item",
        description="Admin can delete a variant of item.",
    ),
)
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
                type=str,
            ),
            OpenApiParameter(
                name="size", description="Filter by size", required=False, type=str
            ),
        ],
        examples=[
            OpenApiExample(
                "Example 1",
                value={
                    "item": 4,
                    "color": 3,
                    "size": "XXL",
                },
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


class LowResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10


@extend_schema_view(
    list=extend_schema(
        summary="Get list of your orders",
        description="User can get a list of his orders.",
    ),
    retrieve=extend_schema(
        summary="Get a certain order",
        description="User can get a certain his order.",
    ),
    create=extend_schema(
        summary="Create a certain order",
        description="User can create an order.",
    ),
    cancel_order=extend_schema(
        summary="Cancel a certain order",
        description="User can cancel a certain his order.",
        methods=["POST"],
    ),
)
class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (CanCancelOrCreateOrGet,)
    pagination_class = LowResultsSetPagination

    @action(detail=True, methods=["POST"], url_path="cancel-order")
    def cancel_order(self, request, pk=None):
        order = self.get_object()
        order.is_canceled = True
        order_items = OrderItem.objects.filter(order_id=order.pk)
        for order_item in order_items:
            quantity = order_item.quantity
            item = get_object_or_404(VariantOfItem, id=order_item.variant_of_item.pk)
            item.quantity += quantity
            item.save()
        order.save()
        return Response(
            {"result": "The order has been cancelled"}, status=status.HTTP_200_OK
        )

    def get_queryset(self):
        queryset = self.queryset
        if self.action == "list":
            queryset = queryset.select_related().prefetch_related(
                "items",
                "items__item",
            )
        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return OrderDetailSerializer
        if self.action == "list":
            return OrderListSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
