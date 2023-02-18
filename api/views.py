import email
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, HttpRequest
from django.shortcuts import redirect
from django.contrib.auth.models import User

from store.models import DeliveryDetails, OrderItem, Product,ProductImages,Order
from rest_framework import generics,filters
from api.serializer import SerializedOrder, SerializedProduct,SerializedProductImages,SerializedOrderItem, SerializedDeliveryDetails
from rest_framework.response import Response
from rest_framework.decorators import api_view

import json

#this api view function is responsible for get a product based on the id and should be a get not post request
@api_view(['POST'])
def productPageData(request):
    #data from the fetch api call
    data = request.data
    product_id = data['id']

    #get the product by the id or raise error 404
    product = get_object_or_404(Product, id=product_id)

    #get the other images associated the product
    image = ProductImages.objects.filter(product=product)

    #serialize the product and image data so it can be sent out
    serial_product = SerializedProduct(product,many=False)
    serial_image = SerializedProductImages(image, many=True)
    data = {'product_info':serial_product.data, 'product_images':serial_image.data}

    #return the response with the data content of the api request
    return Response(data)

#add to cart for a user that is logged in
@api_view(['POST'])
def addToCart(request):
    data = request.data
    product_id = data['id']
    #get the product by the id or raise error 404
    product = get_object_or_404(Product, id=product_id)
    #get the users other or create one if it is not there or does not have one
    my_order, created = Order.objects.get_or_create(user="winter", completed=False)
    #from that order get the items of that order or creat an order item for that other
    item, created = OrderItem.objects.get_or_create(order=my_order, product=product)
    item.quantity += 1
    item.save()
    return Response(200)


#this view function is to view the cart page data for the user or the browser
@api_view(['POST'])
def cartPageData(request):
    #1st check if the user is not logged in
    if str(request.user) == 'AnonymousUser':
        #create object syntack for the cart
        cart = {'total-cost':0, 'total-items':0, 'products':''}
        #get the person cart from the client browser
        #the cookie name here was next-sofa which is dynamic and will changed for different projects
        guest = json.loads(request.COOKIES.get('next-sofa'))
        products = []
        for i in guest:
            product = Product.objects.get(id=i)
            query={'name':product.name, 'price':product.price, 'image':product.imageURL(),'id':product.id}
            products.append(query)
            cart['total-cost'] += product.price * guest[i]['quantity']
            cart['total-items'] += guest[i]['quantity']
        cart['products']=products

    else:
        #if the user is logged in access the order model to get that data
        my_order, created = Order.objects.get_or_create(user="winter", completed=False)
        cart_item = OrderItem.objects.filter(order=my_order)
        products = []
        for i in cart_item:
            query = {}
            #get the oder item id and use it to create a key to store the object
            query[i.id]={'name':i.product.name, 'price':i.product.price, 'image':i.product.imageURL(),'id':i.product.id}
            #print(query)
            products.append(query)
        #print(products)
        order = SerializedOrder(my_order, many=False)
        items = SerializedOrderItem(cart_item, many=True)
        cart= {'items':items.data,'order':order.data, 'total-cost':my_order.get_total_cost,
        'total-items':my_order.get_total_orderitems,'products':products}

    return Response(cart)

#for the cart arthemetics 
@api_view(['POST'])
def cartFunction(request):
    data = request.data
    product_id = data['id']
    operation = data['operation']
    if str(request.user) == 'AnonymousUser':
        # cookie name next-sofa which is dynamic for another project
        cookie_cart = json.loads(request.COOKIES['next-sofa'])
        
        if operation=='add':
            cookie_cart[product_id]['quantity'] +=1
            print(cookie_cart[product_id]['quantity'])
        elif operation=='remove':
            cookie_cart[product_id]['quantity'] -=1
        print(cookie_cart)
        return Response(cookie_cart)
        """ response = HttpResponse()
        response.set_cookie('next-sofa',cookie_cart) """
    else:
        product_id = data['id']
        operation = data['operation']
        user = request.user
        product = get_object_or_404(Product, id=product_id)
        order = get_object_or_404(Order,user='winter',completed=False)
        order_item = get_object_or_404(OrderItem, order=order, product=product)
        if operation == 'add':
            order_item.quantity+=1
            order_item.save()
        elif operation == 'remove':
            order_item.quantity -=1
            order_item.save()
            if order_item.quantity <= 0:
                order_item.delete()
    return Response('')

@api_view(['POST'])
def deliveryFunction(request):
    data = request.data
    #print(data)
    email = data['email']
    name = data['name']
    number = data['number']
    
    my_order =  Order.objects.get(user='winter',completed=False)
    try:
        details_exists = DeliveryDetails.objects.get(order=my_order)
    except:
        details_exists = False

    if details_exists:
        details_exists.delete()

    details = DeliveryDetails.objects.create(user='winter',order=my_order, name=name,email=email,phone_number=number, address='addres')
    serial_datails = SerializedDeliveryDetails(details, many=False)
    return Response(serial_datails.data)


#simple search functionality to get products of the store
class ProductSearch(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = SerializedProduct
    #name = 'products-list'
    filter_backends = [filters.SearchFilter]
    search_fields = [
        '^name','$name'
    ]

def review_form(request):
    pass

def verifying_payment(request,ref):
    delivery = get_object_or_404(DeliveryDetails, reference=ref)
    verified = delivery.verify_payment()
    #if the verified is true then close the order
    return redirect('store:successful')
