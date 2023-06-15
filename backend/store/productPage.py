from django.shortcuts import get_object_or_404

from .models import Product, ProductImages,Review
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

    def productReview(self, _product):
        reviews = Review.objects.filter(product=_product['id'])
        reviews_obj = {}
        for x in reviews:
           reviews_obj[x.id]={'name':str(x.user),'date':str(x.date), 'rating':str(x.rating), 'comment':str(x.comment)}

        
        return reviews_obj

    def productImages(self, _product):
        _product_id = _product['id']
        product_images = ProductImages.objects.filter(product=_product_id)
        serialized_product_images = serializedProductImages(product_images, many=True)
        return serialized_product_images