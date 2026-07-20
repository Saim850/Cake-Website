from django.db import models
from django.core.validators import MinValueValidator
from django.conf import settings

class Division(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class District(models.Model):
    division = models.ForeignKey(
        Division,
        on_delete=models.CASCADE,
        related_name="districts"
    )
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Upazila(models.Model):
    district = models.ForeignKey(
        District,
        on_delete=models.CASCADE,
        related_name="upazilas"
    )
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class ProductCategory(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=30)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='product_category')
    price = models.IntegerField(validators=[MinValueValidator(0)])
    image = models.ImageField(upload_to='product_image/', blank=False, null=False)  

    def __str__(self):
        return self.name
    
class ProductReview(models.Model):
    STATUS_CHOICES = [
        ('0', '0'),
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
        ('5', '5'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="productReview_user")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="productReview_product")
    rating = models.CharField(choices=STATUS_CHOICES, default='0', max_length=1)
    comment = models.TextField()
    
class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_product")
    quantity = models.PositiveIntegerField(default=1)

    @property
    def total_price(self):
        return self.product.price * self.quantity

class ShippingAddress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="shipping_addresses"
    )

    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)

    division = models.ForeignKey(
        Division,
        on_delete=models.PROTECT
    )

    district = models.ForeignKey(
        District,
        on_delete=models.PROTECT
    )

    upazila = models.ForeignKey(
        Upazila,
        on_delete=models.PROTECT
    )
    
    full_address = models.TextField()

    postal_code = models.CharField(max_length=10, blank=True)

    label = models.CharField(
        max_length=20,
        choices=[
            ("Home", "Home"),
            ("Office", "Office"),
            ("Other", "Other"),
        ],
        default="Home"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.label})"
    
    

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("delivered", "Delivered"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    PAYMENT_CHOICES = [
        ("Cash", "Cash On Delivery"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="order_user")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    ordered_at = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(choices=PAYMENT_CHOICES, default="Cash")
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE)
    notes = models.TextField(null=True, blank=True)
    
class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems_order')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orderitems_product")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  

    @property
    def total_price(self):
        return self.price * self.quantity