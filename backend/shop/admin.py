from django.contrib import admin
from .models import Item, SemiCategory, Order, Cart, Size, Color

admin.site.register(Item)
admin.site.register(Size)
admin.site.register(Color)
admin.site.register(SemiCategory)
admin.site.register(Order)
admin.site.register(Cart)