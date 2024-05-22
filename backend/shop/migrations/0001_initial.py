# Generated by Django 4.2.10 on 2024-05-06 22:21

from django.db import migrations, models
import django.db.models.deletion
import shop.models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cart",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
            options={
                "verbose_name": "Кошик",
                "verbose_name_plural": "Кошики",
            },
        ),
        migrations.CreateModel(
            name="Color",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("color", models.CharField(max_length=30, unique=True)),
                ("hex", models.CharField(default="#ffffff", max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name="Gallery",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to=shop.models.create_custom_path)),
            ],
        ),
        migrations.CreateModel(
            name="Item",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=70)),
                (
                    "article",
                    models.CharField(blank=True, max_length=12, null=True, unique=True),
                ),
                ("price", models.DecimalField(decimal_places=2, max_digits=12)),
            ],
            options={
                "verbose_name": "Товар",
                "verbose_name_plural": "Товари",
            },
        ),
        migrations.CreateModel(
            name="SemiCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=30)),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Чоловіче", "Men"),
                            ("Жіноче", "Women"),
                            ("Унісекс", "Unisex"),
                            ("Дитяче", "Child"),
                            ("Дівчаче", "Girl"),
                            ("Хлопчаче", "Boy"),
                        ],
                        max_length=30,
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("Одяг", "Clothes"),
                            ("Взуття", "Shoes"),
                            ("Аксесуари", "Accessories"),
                        ],
                        max_length=30,
                    ),
                ),
            ],
            options={
                "verbose_name": "Підкатегорія",
                "verbose_name_plural": "Підкатегорії",
            },
        ),
        migrations.CreateModel(
            name="VariantOfItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "size",
                    models.CharField(
                        choices=[
                            ("XXS", "Xss"),
                            ("XS", "Xs"),
                            ("S", "S"),
                            ("M", "M"),
                            ("L", "L"),
                            ("XL", "Xl"),
                            ("XXL", "Xxl"),
                            ("XXXL", "Xxxl"),
                        ],
                        max_length=5,
                    ),
                ),
                ("quantity", models.PositiveIntegerField(default=0)),
                (
                    "color",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="shop.color",
                    ),
                ),
                (
                    "item",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sizes",
                        to="shop.item",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("address", models.CharField(max_length=250)),
                ("postal_code", models.CharField(max_length=20)),
                ("city", models.CharField(max_length=100)),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("paid", models.BooleanField(default=False)),
                ("is_canceled", models.BooleanField(default=False)),
                ("items", models.ManyToManyField(to="shop.variantofitem")),
            ],
            options={
                "verbose_name": "Замовлення",
                "verbose_name_plural": "Замовлення",
                "ordering": ("-created",),
            },
        ),
    ]
