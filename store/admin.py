from django.contrib import admin
from .models import Product, ProductImages,Order, OrderItem, DeliveryDetails
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display= ("name","price","quantity")
    prepopulated_fields= {"slug":("name",)}

admin.site.register(Product, ProductAdmin)

admin.site.register(ProductImages)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(DeliveryDetails)