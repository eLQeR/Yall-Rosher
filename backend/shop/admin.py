from django.contrib import admin
from .models import Item, SemiCategory, Category, Order, Cart, TypeClothes

admin.site.register(Item)
admin.site.register(SemiCategory)
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Cart)
admin.site.register(TypeClothes)