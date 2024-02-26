import os
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify


class Sex(models.TextChoices):
    Male = "Чоловік"
    Female = "Жінка"
    Uknown = "Невідомо"
    Other = "Інша"


class Country(models.TextChoices):
    UA = "Україна"
    USA = "США"
    DE = "Німеччина"
    JP = "Японія"
    FR = "Франція"
    GB = "Велика Британія"


class Type(models.TextChoices):
    MEN = "Чоловіче"
    WOMEN = "Жіноче"
    UNISEX = "Унісекс"
    CHILD = "Дитяче"
    GIRL = "Дівчаче"
    BOY = "Хлопчаче"


class Categories(models.TextChoices):
    CLOTHES = "Одяг"
    SHOES = "Взуття"
    ACCESSORIES = "Аксесуари"


class Sizes(models.TextChoices):
    XSS = "XSS"
    XS = "XS"
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"
    XLL = "XLL"
    XLLL = "XLLL"


class User(AbstractUser):
    sex = models.CharField(choices=Sex.choices, default=Sex.Uknown, max_length=20)
    country = models.CharField(choices=Country.choices, default=Country.UA, max_length=20)
    phone = models.CharField(max_length=13)

    class Meta:
        verbose_name = 'Користувач'
        verbose_name_plural = "Користувачі"

    def __str__(self):
        return self.username


class SemiCategory(models.Model):
    name = models.CharField(max_length=30)
    type = models.CharField(choices=Type.choices, max_length=30)
    category = models.CharField(choices=Categories.choices, max_length=30)

    class Meta:
        verbose_name = 'Підкатегорія'
        verbose_name_plural = "Підкатегорії"

    def __str__(self):
        return f"{self.name} - {self.category}"


class Color(models.Model):
    color = models.CharField(max_length=30, unique=True)
    hex = models.CharField(max_length=10, default="#ffffff")

    def __str__(self):
        return f"{self.color}-{self.hex}"


def generate_article():
    while True:
        unique_id = uuid.uuid4()
        article_code = str(unique_id)[-8:]
        article = f"ART-{article_code.upper()}"
        if not Item.objects.filter(article=article).exists():
            return article


class Item(models.Model):
    name = models.CharField(max_length=70)
    semi_category = models.ForeignKey(to=SemiCategory, on_delete=models.CASCADE, related_name="items")
    article = models.CharField(unique=True, max_length=12, blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    colors = models.ManyToManyField(to=Color)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.article:
            self.article = generate_article()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = "Товари"


class VariantOfItem(models.Model):
    size = models.CharField(choices=Sizes.choices, max_length=5)
    quantity = models.PositiveIntegerField(default=0)
    color = models.ForeignKey(to=Color, on_delete=models.CASCADE, null=True)
    item = models.ForeignKey(to=Item, on_delete=models.CASCADE, related_name="sizes", null=True)

    def __str__(self):
        return f"{self.item}-{self.color}-{self.size}"


class Order(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=250)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    items = models.ManyToManyField(to=Item)

    class Meta:
        ordering = ('-created',)
        verbose_name = 'Замовлення'
        verbose_name_plural = "Замовлення"

    def __str__(self):
        return 'Order {}'.format(self.id)

    @property
    def get_total_cost(self):
        return sum(item.price for item in self.items.all())


class Cart(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="cart")
    items = models.ManyToManyField(to=Item)

    @property
    def get_total_cost(self):
        return sum(item.price for item in self.items.all())

    class Meta:
        verbose_name = 'Кошик'
        verbose_name_plural = "Кошики"


def create_custom_path(instance, filename):
    _, extension = os.path.splitext(filename)
    return os.path.join(
        "uploads/images/",
        f"{slugify(instance.item.name)}-{uuid.uuid4()}{extension}"
    )


class Gallery(models.Model):
    image = models.ImageField(upload_to=create_custom_path)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='images')
