from dataclasses import fields
from rest_framework import serializers
from store.models import Product,ProductImages,OrderItem, Order, DeliveryDetails

class SerializedProduct(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class SerializedProductImages(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class SerializedOrderItem(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class SerializedOrder(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class SerializedDeliveryDetails(serializers.ModelSerializer):
    class Meta:
        model = DeliveryDetails
        fields = '__all__'