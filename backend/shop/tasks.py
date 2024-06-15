from __future__ import absolute_import
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone

from shop_system.settings import EMAIL_HOST_USER
from user.models import User
from shop.models import Order


@shared_task
def send_mail_order_creation(user_email, order_number, order_cost):

    message = (
        f"Dear client\n"
        f"Your order №{order_number} has been successfully create.\n"
        f"The cost is {order_cost} UAH\n"
        f"Your Yall-Rosher!\n"
    )
    send_mail(
        "Verify your email",
        message,
        EMAIL_HOST_USER,
        [user_email],
        fail_silently=False,
    )
