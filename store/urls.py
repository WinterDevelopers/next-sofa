from django.urls import path

from . import views

app_name = 'store'

urlpatterns = [
    path('cart', views.cart, name='cart'),
    path('product/<slug:slug>', views.product, name='product'),
    path('shipping/', views.delivery, name='shipping'),
    path('search', views.search, name='search'),
]