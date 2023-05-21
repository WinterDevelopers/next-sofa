from .api.serializer import serializedProducts
from store.models import Product


def topProducts():
    top_products = Product.objects.filter(top_featured=True).order_by('?')[:10]
    data = serializedProducts(top_products, many=True)
    return data
