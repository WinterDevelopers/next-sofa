from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('product-data', views.productPageData, name='product-data'),
    path('add-to-cart', views.addToCart, name="add-to-cart"),
    path('cart', views.cartPageData, name="cart"),
    path('cart-func', views.cartFunction, name="cart-functions"),
    path('delivery-details', views.deliveryFunction, name='delivery-details'),
    path('payment-verify/<slug:ref>', views.verifying_payment, name='payment-verify'),
    path('search-products', views.ProductSearch.as_view(), name='search-products'),
]