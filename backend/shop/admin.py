from django.contrib import admin
from .models import Item, SemiCategory, Order, Color, Gallery, VariantOfItem


class GalleryInline(admin.TabularInline):
    fk_name = 'item'
    model = Gallery
    extra = 5


class VariantOfItemInline(admin.TabularInline):
    fk_name = 'item'
    model = VariantOfItem
    extra = 5


@admin.register(Item)
class ProductAdmin(admin.ModelAdmin):
    exclude = ["article"]
    inlines = [VariantOfItemInline, GalleryInline]


admin.site.register(Color)
admin.site.register(SemiCategory)
admin.site.register(Order)
