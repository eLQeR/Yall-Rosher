import signal

from django.db.models.signals import post_save
from django.dispatch import receiver

from shop.models import Order


@receiver(post_save, sender=Order)
def update_order_price(sender, instance, created, **kwargs):
    if created:
        instance.cost = instance.get_total_cost()
        instance.save()


