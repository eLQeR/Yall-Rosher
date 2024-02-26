from django.urls import path, include
from .views import SemiCategoryViewSet, ItemViewSet
from rest_framework import routers

router = routers.DefaultRouter()

router.register("semi-categories", SemiCategoryViewSet)
router.register("items", ItemViewSet)


urlpatterns = [
    path("", include(router.urls)),
]

app_name = "shop"
