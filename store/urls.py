from django.urls import path
from django.contrib.sitemaps.views import sitemap

from .sitemap import ProductsSitemap
from . import views

app_name = 'store'

sitemaps = {
    'meta-data': ProductsSitemap
}

urlpatterns = [
    path('cart', views.cart, name='cart'),
    path('successful', views.successful, name='successful'),
    path('sitemap.xml', sitemap, {'sitemaps':sitemaps}, name = 'django.contrib.sitemaps.views.sitemap'),
    path('shipping/', views.delivery, name='shipping'),
    path('search', views.search, name='search'),
    path('<slug:slug>/', views.product, name='product'),
]