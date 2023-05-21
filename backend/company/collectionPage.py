from django.shortcuts import get_object_or_404

from .api.serializer import serializedProducts,serializedCollection
from store.models import Product,Collection

class CollectionPageView():
    def __init__(self,collection_name):
        self.collection_name = collection_name
        return
        
    def getCollectionInfo(self):
        collection = get_object_or_404(Collection, slug=self.collection_name)
        collection_data = serializedCollection(collection)
        return collection_data

        
    def getCollectionProducts(self, collectionModel):
        collection_id = collectionModel['id']
        collection_products = Product.objects.filter(collection=collection_id)[:8]
        collection_product_data = serializedProducts(collection_products, many=True)
        return collection_product_data