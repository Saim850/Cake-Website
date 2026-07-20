from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ecommarce_app import views as v
from rest_framework_nested import routers
from user.views import UserRegisterView, ContactViewSet

router = DefaultRouter()
router.register('sing-up', UserRegisterView, basename="sing-up")

router.register('division', v.DivisionViewSet)
router.register('district', v.DistictViewSet, basename="district")
router.register('upazila', v.UpazilaViewSet, basename="upazila")
router.register('shipping-address', v.ShippingAddressViewSet, basename='shipping_address')

router.register('product', v.ProductViewSet)
router.register('category', v.CategoryViewSet)

router.register("cart", v.CartViewSet, basename="cart")
router.register("cart-items", v.CartItemViewSet, basename='cart-items')

router.register("order", v.OrderViewSet, basename='orders')
router.register("all-orders", v.AllOrderViewSet, basename='all-orders')

router.register('contact', ContactViewSet)

product_router = routers.NestedDefaultRouter(router, 'product', lookup='product')
product_router.register('review', v.ProductReviewViewSet, basename='product-review')

urlpatterns = [
    path("", include(router.urls)),
    path("", include(product_router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path("admin/users/<int:pk>/", v.AdminDeleteUserView.as_view(), name="admin-delete-user",),
]