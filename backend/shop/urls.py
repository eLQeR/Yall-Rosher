from django.urls import path, include
from shop.views import (
    SemiCategoryViewSet,
    ItemViewSet,
    OrderViewSet,
    VariantOfItemViewSet,
)
from rest_framework import routers

router = routers.DefaultRouter()

router.register("semi-categories", SemiCategoryViewSet)
router.register("items", ItemViewSet)
router.register("orders", OrderViewSet)
router.register("variants_of_item", VariantOfItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

app_name = "shop"
