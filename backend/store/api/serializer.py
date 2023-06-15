from rest_framework import serializers
from company.models import CustomUser
from ..models import Product, ProductImages, Order, OrderItem, DeliveryDetails,PurchasedItem, Review

class serializedProducts(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class serializedProductImages(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class serializedOrder(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class serializedOrderItem(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class serializedDeliveryDetails(serializers.ModelSerializer):
    class Meta:
        model = DeliveryDetails
        fields = '__all__'

class serializedCustomUser(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class serializedPurchasedItem(serializers.ModelSerializer):
    class Meta:
        model = PurchasedItem
        fields = '__all__'

class serializedReview(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'