from django.urls import path
from django.contrib.sitemaps.views import sitemap

from .sitemap import ProductsSitemap
from .api.views import (getProduct, cartFunc,shippingPage, verifyPayment, trackingItem, submitReview, userRate)
from .api import views

app_name = 'store'

sitemaps = {
    'meta-data': ProductsSitemap
}

urlpatterns = [
    path('cart', cartFunc, name='cart'),
    #path('successful', views.successful, name='successful'),
    path('sitemap.xml', sitemap, {'sitemaps':sitemaps}, name = 'django.contrib.sitemaps.views.sitemap'),
    path('shipping', shippingPage, name='shipping'),
    path('user-rate', userRate, name='user-rate'),
    path('search-products', views.ProductSearch.as_view(), name='search-products'),
    path('track-item/<slug:tracking_id>', trackingItem, name='track-item'),
    path('verify-payment/<slug:ref>', verifyPayment, name='verify-payment'),
    path('rate-product',submitReview, name='rate-product'),
    path('<slug:slug>/', getProduct, name='product'),
]