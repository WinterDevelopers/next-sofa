from django.shortcuts import get_object_or_404

from .models import Product, ProductImages
from .api.serializer import serializedProducts, serializedProductImages


class ProductPage:
    def __init__(self, slug):
        self.slug = slug

    def getProduct(self):
        product = get_object_or_404(Product, slug=self.slug)
        serialized_product = serializedProducts(product)
        return serialized_product
    
    def getRelatedProduct(self):
        product = get_object_or_404(Product, slug=self.slug)
        related_product = Product.objects.filter(collection=product.collection).exclude(id=product.id).order_by('?')[:5]
        serializedRelated = serializedProducts(related_product, many=True)

        return serializedRelated
    
    def productImages(self, _product):
        _product_id = _product['id']
        product_images = ProductImages.objects.filter(product=_product_id)
        serialized_product_images = serializedProductImages(product_images, many=True)
        return serialized_product_images