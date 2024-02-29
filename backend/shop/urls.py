from django.urls import path, include
from .views import SemiCategoryViewSet, ItemViewSet, CreateUserView, ManageUserView
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()

router.register("semi-categories", SemiCategoryViewSet)
router.register("items", ItemViewSet)


class CreateTokenView:
    pass


urlpatterns = [
    path("", include(router.urls)),
    path("register/", CreateUserView.as_view(), name="create"),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

app_name = "shop"
