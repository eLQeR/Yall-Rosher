import uuid
import faker
from django.core.exceptions import ObjectDoesNotExist

from shop.models import Item, SemiCategory, Color, VariantOfItem
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from user.models import User
from shop.serializers import ItemListSerializer, ItemDetailSerializer

faker = faker.Faker()


def sample_semicategory():
    return SemiCategory.objects.create(name=f"Category-{faker.slug()}")


def sample_color():
    return Color.objects.create(color=f"Color-{faker.slug()}")


def sample_item(**kwargs):
    unique_id = uuid.uuid4()
    semi_category = None
    if not kwargs.get("semi_category"):
        semi_category = sample_semicategory()
    item_data = {
        "name": "Test Item",
        "semi_category": semi_category,
        "article": f"ART-{unique_id}",
        "price": 500,
    }
    item_data.update(kwargs)
    color = sample_color()
    item = Item.objects.create(**item_data)
    item.colors.add(color)
    item.save()
    return item


ITEM_URL = "/api/yall-rosher/items/"


class AuthenticatedUserItemsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        for i in range(9):
            sample_item()

        self.sample_order = Item.objects.first()

        self.user = User.objects.create_user(
            username='Test-user',
            password='<PASSWORD>'
        )
        self.semicategory = sample_semicategory()
        self.data = {
            "name": "Test Created Item",
            "semi_category": sample_semicategory(),
            "article": f"ART-{uuid.uuid4()}",
            "price": 500,
        }
        self.client.force_authenticate(user=self.user)

    def test_get_items(self):
        response = self.client.get(ITEM_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["results"], ItemListSerializer(Item.objects.all(), many=True).data
        )

    def test_filtered_items(self):
        for _ in range(10):
            sample_item(**{"semi_category": self.semicategory})

        response = self.client.get(f"{ITEM_URL}?category={self.semicategory.id}")
        items = Item.objects.filter(semi_category=self.semicategory)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)
        self.assertEqual(response.data["results"], ItemListSerializer(items, many=True).data)

    def test_retrieve_item(self):
        item = sample_item()
        response = self.client.get(f"{ITEM_URL}{item.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, ItemDetailSerializer(item, many=False).data)

    def test_create_item_forbidden(self):
        response = self.client.post(
            ITEM_URL,
            self.data,
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertRaises(ObjectDoesNotExist, Item.objects.get, name="Test Created Item")

    def test_update_item_forbidden(self):
        response = self.client.put(
            f"{ITEM_URL}1/",
            self.data,
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertRaises(ObjectDoesNotExist, Item.objects.get, name="Test Created Item")

    def test_partial_update_item_forbidden(self):
        response = self.client.patch(
            f"{ITEM_URL}1/",
            self.data,
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertRaises(ObjectDoesNotExist, Item.objects.get, name="Test Created Item")

    def test_delete_item_forbidden(self):
        response = self.client.delete(f"{ITEM_URL}1/")
        db_airport_id_1 = Item.objects.filter(pk=1)

        self.assertEqual(db_airport_id_1.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_invalid_item(self):
        response = self.client.get(f"{ITEM_URL}1001/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class AdminApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        user = User.objects.create_superuser(username='admin_user', password='<PASSWORD>')
        self.client.force_authenticate(user=user)
        self.unique_id = uuid.uuid4()
        self.semi_category = sample_semicategory()
        self.item_data = {
            "name": "Test Created Item",
            "semi_category": self.semi_category,
            "article": f"ART-{str(self.unique_id)[:6]}",
            "price": 500,
        }
        self.item = Item.objects.create(**self.item_data)
        self.item_data.update(
            {
                "semi_category": self.semi_category.pk,
                "article": f"ART-{str(uuid.uuid4())[:6]}"
            }
        )
        self.color_data = {"color": "Test Added Color", "hex": "#FFFFFF"}

    def test_create_item(self):
        response = self.client.post(
            ITEM_URL,
            self.item_data,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Test Created Item")
        self.assertEqual(Item.objects.count(), 2)

    def test_update_item(self):
        self.item_data["name"] = "Test Updated Item"
        response = self.client.put(
            f"{ITEM_URL}{self.item.id}/",
            self.item_data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test Updated Item")
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(Item.objects.get(pk=1).name, "Test Updated Item")

    def test_add_color_to_item(self):
        color = Color.objects.create(**self.color_data)
        response = self.client.patch(
            f"{ITEM_URL}{self.item.id}/",
            {"colors": [color.pk]},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["colors"], [color.pk])
        self.assertEqual(Item.objects.count(), 1)
        self.assertEqual(
            list(Item.objects.get(pk=1).colors.all()),
            [color]
        )

    def test_add_variants_to_item(self):
        color = Color.objects.create(**self.color_data)
        variant_xl = VariantOfItem.objects.create(
            item=self.item,
            color=color,
            size="XL",
            quantity=10

        )
        variant_xs = VariantOfItem.objects.create(
            item=self.item,
            color=color,
            size="XS",
            quantity=10
        )
        response = self.client.patch(
            f"{ITEM_URL}{self.item.id}/",
            {
                "colors": [color.pk],
                "variants_of_item": [variant_xl.pk, variant_xs.pk],
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["colors"], [color.pk])
        self.assertEqual(
            response.data["sizes"],
    [variant_xl.pk, variant_xs.pk]
        )
        self.assertEqual(Item.objects.count(), 1)

    def test_delete_item(self):
        response = self.client.delete(
            f"{ITEM_URL}{self.item.id}/",
        )
        db_item_id_1 = Item.objects.filter(pk=1)

        self.assertEqual(db_item_id_1.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_item(self):
        response = self.client.delete(
            f"{ITEM_URL}1001/",
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
