from django.contrib.auth.models import AbstractUser
from django.db import models


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
    UNISEX = "Універсальне"
    CHILD = "Дитяче"
    GIRL = "Дівчаче"
    BOY = "Хлопчаче"
    ACCESSORIES = "Аксесуари"


class User(AbstractUser):
    sex = models.CharField(choices=Sex.choices, default=Sex.Uknown, max_length=20)
    country = models.CharField(choices=Country.choices, default=Country.UA, max_length=20)
    phone = models.CharField(max_length=13)

    class Meta:
        verbose_name = 'Користувач'
        verbose_name_plural = "Користувачі"

    def __str__(self):
        return self.username


class TypeClothes(models.Model):
    type = models.CharField(choices=Type.choices, max_length=30)

    class Meta:
        verbose_name = 'Тип одягу'
        verbose_name_plural = "Типи одягу"

    def __str__(self):
        return self.type


class SemiCategory(models.Model):
    name = models.CharField(max_length=30)
    type = models.ForeignKey(to=TypeClothes, on_delete=models.CASCADE, default=1)

    class Meta:
        verbose_name = 'Підкатегорія'
        verbose_name_plural = "Підкатегорії"

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=30)
    semi_category = models.ManyToManyField(to=SemiCategory, null=True, blank=True)

    class Meta:
        verbose_name = 'Категорія'
        verbose_name_plural = "Категорії"

    def __str__(self):
        return f"{self.name}"


class Item(models.Model):
    name = models.CharField(max_length=70)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name="items")
    semi_category = models.ForeignKey(to=SemiCategory, on_delete=models.CASCADE, related_name="items")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = "Товари"


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

