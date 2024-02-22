from django.urls import path, include
from .views import SemiCategoryViewSet, ItemViewSet
from rest_framework import routers

router_semi_category = routers.DefaultRouter()
router_item = routers.DefaultRouter()


router_semi_category.register("semi-categories", SemiCategoryViewSet)
router_item.register("items", ItemViewSet)


urlpatterns = [
    path("", include(router_semi_category.urls), name="semi-categories"),
    path("", include(router_item.urls), name="items"),

]

app_name = "shop"
