import ecommarce_app.models as m
import ecommarce_app.serializers as s
import ecommarce_app.filter as f

from rest_framework.viewsets import ModelViewSet
from rest_framework import generics

from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.shortcuts import get_object_or_404

from ecommarce_app.permissions import IsAdminOrReadOnly, IsUserOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from rest_framework.filters import SearchFilter, OrderingFilter
from ecommarce_app.paganations import DefaultPaganations

from django.contrib.auth import get_user_model
User = get_user_model()


class DivisionViewSet(ModelViewSet):
    queryset = m.Division.objects.all()
    serializer_class = s.DivisionSeiralizer

class DistictViewSet(ModelViewSet):
    def get_queryset(self):
        queryset = m.District.objects.all()
        division = self.request.query_params.get("division")

        if division:
            queryset = queryset.filter(division_id=division)

        return queryset

    serializer_class = s.DistrictSerializer

class UpazilaViewSet(ModelViewSet):
    def get_queryset(self):
        queryset = m.Upazila.objects.all()
        district = self.request.query_params.get("district")

        if district:
            queryset = queryset.filter(district_id=district)

        return queryset
    
    serializer_class = s.UpazilaSerializer

class ProductViewSet(ModelViewSet):
    queryset = m.Product.objects.select_related('category')
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = s.ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = f.ProductFilter
    search_fields = ['name', 'category']
    ordering_fields = ['price']
    pagination_class = DefaultPaganations

class ProductReviewViewSet(ModelViewSet):
    queryset = m.ProductReview.objects.all()
    serializer_class = s.ProductReviewSerializer
    permission_classes = [IsUserOrReadOnly]
    
    def perform_create(self, serializer):
        product_pk = self.kwargs.get('product_pk')
        product = get_object_or_404(m.Product, id=product_pk)
        serializer.save(user=self.request.user, product=product)

class CategoryViewSet(ModelViewSet):
    queryset = m.ProductCategory.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = s.CategorySerializer

class CartViewSet(ModelViewSet):
    serializer_class = s.CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return m.Cart.objects.prefetch_related("items").filter(user=self.request.user)

    def get_object(self):
        cart, created = m.Cart.objects.get_or_create(
            user=self.request.user
        )
        return cart

class CartItemViewSet(ModelViewSet):
    serializer_class = s.CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return m.CartItem.objects.prefetch_related("product").filter(
            cart__user=self.request.user
        )

    def perform_create(self, serializer):
        cart, created = m.Cart.objects.get_or_create(
            user=self.request.user
        )

        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        print(product)

        cart_item = m.CartItem.objects.filter(
            cart=cart,
            product=product
        ).first()

        # if product already exists in cart
        if cart_item:
            cart_item.quantity += quantity
            cart_item.save()
        else:
            serializer.save(
                cart=cart,
                product=product
            )

class ShippingAddressViewSet(ModelViewSet):
    serializer_class = s.ShippingAddressSerializer

    def get_queryset(self):
        shipping_addres = (
            m.ShippingAddress.objects.filter(user=self.request.user)
        ) 
        return shipping_addres;
            
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class OrderViewSet(ModelViewSet):
    serializer_class = s.OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        order = (
            m.Order.objects
            .select_related('user', 'shipping_address')
            .prefetch_related("orderitems_order")
            .filter(user=self.request.user)
        )
        return order;

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        user = request.user
        try:
            cart = user.cart
        except m.Cart.DoesNotExist:
            return Response(
                {"error":"Car is Empty"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart_items = cart.items.all()
        if not cart_items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        shipping_address = serializer.validated_data['shipping_address'];
                                         
        total_price = 0
        order = m.Order.objects.create(user=user, shipping_address=shipping_address)

        for item in cart_items:
            m.OrderItems.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)
            total_price += item.product.price*item.quantity
            product = m.Product.objects.get(id=item.product.id)
            product.save()

        order.total_price = total_price
        order.save()

        cart_items.delete()
        serializer = self.get_serializer(order)

        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == 'pending':
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError(f"Order Already {instance.status}. You can't cancelled your order.")

class AllOrderViewSet(ModelViewSet):
    serializer_class = s.AllOrderSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        all_order = (
            m.Order.objects
            .select_related('user', 'shipping_address')
            .prefetch_related("orderitems_order")
        )
        return all_order;

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == 'pending':
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError(f"Order Already {instance.status}. You can't cancelled your order.")
        
class AdminDeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]