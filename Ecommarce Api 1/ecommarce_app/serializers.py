from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ecommarce_app import models as m
from user.serializers import UserSerializer

class DivisionSeiralizer(ModelSerializer):
    class Meta:
        model = m.Division
        fields = ['id', 'name']

class DistrictSerializer(ModelSerializer):
    class Meta:
        model = m.District
        fields = ['id', 'division', 'name']

class UpazilaSerializer(ModelSerializer):
    class Meta:
        model = m.Upazila
        fields = ['id', 'district', 'name']

class ProductSerializer(ModelSerializer):
    category_name = serializers.CharField(source = "category.name", read_only = True);
    class Meta:
        model = m.Product
        fields = ['id', 'name', 'category', 'category_name', 'price', 'image']

class ProductReviewSerializer(ModelSerializer):
    class Meta:
        model = m.ProductReview
        fields = ['id', 'user', 'product', 'rating', 'comment']
        read_only_fields= ['user', 'product']

class CategorySerializer(ModelSerializer):
    class Meta:
        model = m.ProductCategory
        fields = ['id', 'name']

class CartItemSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='product.name', read_only=True)
    category = serializers.CharField(source='product.category', read_only=True)
    price = serializers.CharField(source='product.price', read_only=True)
    image = serializers.CharField(source='product.image', read_only=True)


    total_price = serializers.SerializerMethodField()

    class Meta:
        model = m.CartItem
        fields = ["id", "product", 'name', 'category', 'price', 'image',  "quantity", 'total_price']

    def get_total_price(self, obj):
        if hasattr(obj, 'total_price'):
            return obj.total_price
    
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    class Meta:
        model = m.Cart
        fields = ["id", 'user', "items", 'total_price']
        read_only_fields = ['user']

    def get_total_price(self, obj):
        return obj.total_price

class OrderItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = m.OrderItems
        fields = ['id', 'product', 'quantity', 'price', 'total_price']

class ShippingAddressSerializer(serializers.ModelSerializer):
    upazila_name = serializers.CharField(source="upazila.name", read_only=True)
    district_name = serializers.CharField(source="district.name", read_only=True)
    division_name = serializers.CharField(source="division.name", read_only=True)

    class Meta:
        model = m.ShippingAddress
        fields = [
            'id', 'user', 'full_name', 
            'phone', 'division', 'division_name',
            'district', 'district_name', 'upazila', 
            'upazila_name', 'full_address', 'postal_code', 
            'label', 'created_at', 'updated_at'
            ]
        read_only_fields = ['user', 'created_at', 'updated_at']
        
class OrderSerializer(serializers.ModelSerializer):
    orderitems_order = OrderItemsSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    class Meta:
        model = m.Order
        fields = ['id', 'user', 'orderitems_order', 'ordered_at', 'status', 'payment_method', 'shipping_address', 'notes', 'total_price']
        read_only_fields = ['user', 'status', 'total_price']
        
class AllOrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    shipping_address = ShippingAddressSerializer(read_only=True)
    orderitems_order = OrderItemsSerializer(many=True, read_only=True)
    class Meta:
        model = m.Order
        fields = ['id', 'user', 'orderitems_order', 'ordered_at', 'status', 'payment_method', 'shipping_address', 'notes', 'total_price']
        read_only_fields = ['total_price']