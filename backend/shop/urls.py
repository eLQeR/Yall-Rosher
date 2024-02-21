from django.urls import path, include
from .views import CategoryViewSet, SemiCategoryViewSet, ItemViewSet
from rest_framework import routers

router_category = routers.DefaultRouter()
router_semi_category = routers.DefaultRouter()
router_item = routers.DefaultRouter()

router_category.register("categories", CategoryViewSet)
router_semi_category.register("semi-categories", SemiCategoryViewSet)
router_item.register("items", ItemViewSet)


urlpatterns = [
    path("category/", include(router_category.urls), name="categories"),
    path("category/semi/", include(router_semi_category.urls), name="semi-categories"),
    path("category/semi/items/", include(router_item.urls), name="items"),

]

app_name = "shop"
