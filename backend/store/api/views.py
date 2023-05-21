from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import generics,filters

from .serializer import serializedPurchasedItem, serializedProducts, serializedOrderItem

from ..productPage import ProductPage
from ..shippingFunc import ShippingFunc
from ..models import Product, Order, OrderItem,DeliveryDetails,PurchasedItem
from ..send_receipt import send_receipt

import json


@api_view(['GET'])
@permission_classes([AllowAny])
def getProduct(request, slug):
    product = ProductPage(slug)
    the_product = product.getProduct()
    related_products = product.getRelatedProduct()
    the_product_images = product.productImages(the_product.data)    
    product_data = {'product':the_product.data, 'product_image':the_product_images.data, 'related_products':related_products.data}
    return Response(product_data)

@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def cartFunc(request):
    data = request.data
    product_id = data['id']
    action = data['action']
    #mini validate and get product and user
    product = get_object_or_404(Product, id=product_id)
    current_user = request.user
    #check if user has and open order
    order, created = Order.objects.get_or_create(user=current_user, completed=False)
    item, created = OrderItem.objects.get_or_create(order=order,product=product)
    if action == 'add':
        item.quantity +=1
        item.save()
    elif action == 'remove':
        item.quantity -=1
        item.save()
        if item.quantity <= 0:
            item.delete()
    
    return Response(200)           
            

@api_view(['POST'])
@permission_classes([AllowAny])
def shippingPage(request):
    data = request.data
    user = request.user
    if str(user) == 'AnonymousUser':
        user_status = False
        shipping_details = {
        "name":data['name'],
        "email":data['email'],
        "phone_number":data['phone_number'],
        "address":data['address'],
        }
    elif user:
        user_status = True
        shipping_details = {
        "name":str(user),
        "email":request.user.email,
        "phone_number":data['phone_number'],
        "address":data['address'],
        }

    cart = data['cart']

    shipping = ShippingFunc(cart,shipping_details,user_status)
    cost,order = shipping.cartToOrder()
    ref_ = shipping.processDeliveryInfo(order)
    res_return = {'details':shipping_details,'cost':cost, 'ref':ref_}
    return Response(res_return,201)

@api_view(['GET'])
@permission_classes([AllowAny])
def verifyPayment(request,ref):
    delivery = get_object_or_404(DeliveryDetails, reference=ref)
    delivery_payment_status = delivery.verify_payment()
    if delivery_payment_status:
        purchased_item = PurchasedItem.objects.create(order=delivery.order, email=delivery.email, address=delivery.address, total=delivery.order.get_total_cost, transaction_id=delivery.reference)

        try:
            sent_receipt=send_receipt(purchased_item.tracking_id,purchased_item.email)
            if sent_receipt == True:
                purchased_item.email_sent = True
        
            res_return = purchased_item.tracking_id
            return Response(res_return,201)
        except:
            res_return =purchased_item.tracking_id
            return Response(res_return,202)
    
    elif not delivery_payment_status:
        res_return = 'we cound\'nt verify the Payment pls contact your us incase of anything'
        return Response(res_return,400)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def trackingItem(request,tracking_id):

    tracked_item = get_object_or_404(PurchasedItem, tracking_id=tracking_id)
    order = get_object_or_404(Order, id=tracked_item.order.id)
    order_items = OrderItem.objects.filter(order=order)
    tracked_products = []
    for x in order_items:
        prd_obj = {'name':str(x.product.name),'image':str(x.product.imageURL()) ,'price':str(x.product.price)}
        tracked_products.append(prd_obj)
        
    purchased_details = serializedPurchasedItem(tracked_item,many=False)
    purchased_items = serializedOrderItem(order_items, many=True)
    tracking_response = {'details':purchased_details.data, 'items':tracked_products}
    
    return Response(tracking_response,200)


#simple search functionality to get products of the store
class ProductSearch(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = serializedProducts
    #name = 'products-list'
    filter_backends = [filters.SearchFilter]
    search_fields = [
        '^name','$name'
    ]
