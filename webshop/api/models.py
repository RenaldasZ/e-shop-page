from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user')

    class Meta:
        verbose_name = "Customer"
        verbose_name_plural = "Customers"
        db_table_comment = "Question answers"
        pass

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    pictureUrl =  models.CharField(max_length=256, name="pictureUrl", default="/image1.png")
    brand = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    quantityInStock = models.IntegerField(default=5)
    productSize = models.CharField(max_length=100, default="m")

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        db_table_comment = "Question answers"
        pass

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderItem')
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        db_table_comment = "Question answers"
        pass

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        verbose_name = "OrderItem"
        verbose_name_plural = "OrderItems"
        db_table_comment = "Question answers"
        pass