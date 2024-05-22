from django.urls import path, include
from shop.views import SemiCategoryViewSet, ItemViewSet, OrderViewSet, VariantOfItemViewSet
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

router.register("semi-categories", SemiCategoryViewSet)
router.register("items", ItemViewSet)
router.register("orders", OrderViewSet)
router.register("variants_of_item", VariantOfItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

app_name = "shop"
