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


class Colors(models.TextChoices):
    RED = "Червоний"
    WHITE = "Білий"
    GREEN = "Зелений"
    BLACK = "Чорний"
    GRAY = "Сірий"
    YELLOW = "Жовтий"
    PINK = "Фіолетовий"
    BLUE = "Синій"


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
        return self.name


class Size(models.Model):
    size = models.CharField(choices=Sizes.choices, max_length=5)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return self.size


class Color(models.Model):
    color = models.CharField(choices=Colors.choices, max_length=11)

    def __str__(self):
        return self.color


class Item(models.Model):
    name = models.CharField(max_length=70)
    semi_category = models.ForeignKey(to=SemiCategory, on_delete=models.CASCADE, related_name="items")
    sizes = models.ManyToManyField(to=Size)
    colors = models.ManyToManyField(to=Color)
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
