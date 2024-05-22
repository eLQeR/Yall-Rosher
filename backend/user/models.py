from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Country(models.TextChoices):
        UA = "Україна"
        USA = "США"
        DE = "Німеччина"
        JP = "Японія"
        FR = "Франція"
        GB = "Велика Британія"

    class Sex(models.TextChoices):
        Male = "Чоловік"
        Female = "Жінка"
        Unknown = "Невідомо"
        Other = "Інша"

    sex = models.CharField(choices=Sex.choices, default=Sex.Unknown, max_length=20)
    country = models.CharField(choices=Country.choices, default=Country.UA, max_length=20)
    phone = models.CharField(max_length=13)

    class Meta:
        verbose_name = 'Користувач'
        verbose_name_plural = "Користувачі"

    def __str__(self):
        return self.username

