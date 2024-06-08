import uuid
import faker


from rest_framework.exceptions import ErrorDetail
from shop.models import Item, Order, VariantOfItem, SemiCategory, Color, OrderItem
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from user.models import User
from shop.serializers import OrderSerializer, OrderListSerializer

ORDER_URL = "/api/yall-rosher/orders/"

faker = faker.Faker()


def sample_semicategory():
    return SemiCategory.objects.create(name=f"Category-{faker.slug()}")


def sample_color():
    return Color.objects.create(color=f"Color-{faker.slug()}")


def sample_variants_of_item(**kwargs):
    unique_id = uuid.uuid4()
    if not kwargs.get("semi_category"):
        semi_category = sample_semicategory()
    item_data = {
        "semi_category": semi_category,
        "article": f"ART-{unique_id}",
        "price": 500,
    }
    item_data.update(kwargs)
    color = sample_color()
    item = Item.objects.create(**item_data)
    item.colors.add(color)
    return (
        VariantOfItem.objects.create(item=item, color=color, size="L", quantity=10),
        VariantOfItem.objects.create(item=item, color=color, size="XL", quantity=10)
    )


def sample_order(user=None, items=None, index=0):
    if user is None:
        user = User.objects.create_user(
            username=f"{faker.user_name()}-{index}",
            password='<PASSWORD>'
        )
    if items is None:
        items = sample_variants_of_item()
    order = Order.objects.create(
        city=faker.city(),
        postal_code=faker.random_int(),
        address=faker.address(),
        user=user,
    )
    for variant_of_item in items:
        OrderItem.objects.create(order=order, variant_of_item=variant_of_item, quantity=1)

    return order


class AuthenticatedUserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        for i in range(9):
            sample_order(index=i)

        self.sample_order = Order.objects.first()

        self.user = User.objects.create_user(
            username='Test-user',
            password='<PASSWORD>'
        )

        self.data = {
            "address": faker.address(),
            "postal_code": faker.random_int(),
            "city": faker.city(),
            "items": [
                {"variant_of_item": 1, "quantity": 1},
                {"variant_of_item": 2, "quantity": 1},
            ]
        }
        self.client.force_authenticate(user=self.user)

    def test_get_no_orders(self):
        response = self.client.get(ORDER_URL)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_created_orders(self):
        for _ in range(3):
            sample_order(self.user)
        orders = Order.objects.filter(user=self.user)
        response = self.client.get(ORDER_URL)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data, OrderListSerializer(orders, many=True).data)

    def test_create_order(self):
        order_count = Order.objects.filter(user=self.user).count()
        response = self.client.post(ORDER_URL, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            Order.objects.filter(user=self.user).count(),
            order_count + 1
        )
        order = Order.objects.filter(user=self.user).last()
        self.assertEqual(response.data, OrderSerializer(order, many=False).data)

    def test_create_order_with_another_user_id(self):
        user = User.objects.create_user(
            username='Test-for-Order',
            password='<PASSWORD>'
        )
        self.data["user"] = user.id

        response = self.client.post(ORDER_URL, self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(Order.objects.filter(user=user)), 0)
        order = Order.objects.get(pk=response.data["id"])
        self.assertNotEqual(order.user, user)

    def test_create_order_with_invalid_item(self):
        self.data["items"] = [{"variant_of_item": 100, "quantity": 1}]
        response = self.client.post(ORDER_URL, self.data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        variants_of_item_field = response.data["items"][0]
        self.assertEqual(
            variants_of_item_field["variant_of_item"],
            [
                ErrorDetail(
                    'Invalid pk "100" - object does not exist.',
                    code="does_not_exist"
                )
            ],
        )

    def test_create_order_with_more_quantity_than_set(self):
        self.data["items"] = [{"variant_of_item": 2, "quantity": 11}]
        response = self.client.post(ORDER_URL, self.data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["non_field_errors"],
            ["Quantity must be between 1 and 10"],
        )

    def test_create_order_with_zero_quantity(self):
        variant_of_item = VariantOfItem.objects.get(pk=2)
        variant_of_item.quantity = 0
        variant_of_item.save()

        self.data["items"] = [{"variant_of_item": 2, "quantity": 1}]
        response = self.client.post(ORDER_URL, self.data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(variant_of_item.quantity, 0)
        self.assertEqual(
            response.data["non_field_errors"],
            ["There are no such item"],
        )

    def test_update_order_forbidden(self):
        another_user = User.objects.create_user(
            username="Another User",
            password="PASSWORD"
        )
        order = sample_order(user=another_user)
        data = {"user": self.id}
        response = self.client.put(f"{ORDER_URL}{order.id}/", data)

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        order.refresh_from_db()
        self.assertEqual(len(Order.objects.filter(pk=self.user.id)), 1)

    def test_cancel_order(self):
        order = sample_order(user=self.user)
        response = self.client.post(f"{ORDER_URL}{order.id}/cancel-order/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        order.refresh_from_db()
        self.assertTrue(order.is_canceled)

    def test_delete_order_forbidden(self):
        order = sample_order(user=self.user)
        response = self.client.delete(f"{ORDER_URL}{order.id}/")

        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(len(Order.objects.filter(pk=order.id)), 1)

    def test_get_someone_order(self):
        another_user = User.objects.create_user(
            username="Another User",
            password="PASSWORD"
        )
        order = sample_order(user=another_user)
        response = self.client.get(f"{ORDER_URL}{order.id}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "No Order matches the given query.")

    def test_get_invalid_order(self):
        response = self.client.get(f"{ORDER_URL}1001/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class UnauthenticatedUserApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        for i in range(9):
            sample_order(index=i)

        self.data = {
            "address": faker.address(),
            "postal_code": faker.random_int(),
            "city": faker.city(),
            "items": [
                {"variant_of_item": 1, "quantity": 1},
                {"variant_of_item": 2, "quantity": 1},
            ]
        }

    def test_create_order_forbidden(self):
        response = self.client.post(ORDER_URL, self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_order_forbidden(self):
        response = self.client.put(f"{ORDER_URL}1/", self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_partial_update_order_forbidden(self):
        response = self.client.patch(f"{ORDER_URL}1/", self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_order_forbidden(self):
        response = self.client.delete(
            f"{ORDER_URL}1/",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
