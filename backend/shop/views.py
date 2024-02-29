
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Cart, Item, SemiCategory
from .serializers import SemiCategorySerializer, ItemSerializer, ItemListSerializer, UserSerializer


class SemiCategoryViewSet(viewsets.ModelViewSet):
    queryset = SemiCategory.objects.all()
    serializer_class = SemiCategorySerializer
    permission_classes = (JWTAuthentication, )

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

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer



class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        return self.request.user
