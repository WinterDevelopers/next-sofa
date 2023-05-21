from .api.serializer import serializedOrder,serializedOrderItem,serializedDeliveryDetails,serializedCustomUser
from .models import Order, OrderItem, Product, DeliveryDetails
from company.models import CustomUser

from django.shortcuts import get_object_or_404

class ShippingFunc:
    def __init__(self,cart_details,delivery_details,user_status):
        self.cart_details = cart_details
        self.delivery_details = delivery_details
        self.user_status = user_status


    def _set_delivery_details(self, order):
        try:
            delivery = DeliveryDetails.objects.get(order=order, payment_status=False)
            delivery.delete()
        except:
            pass
            
        created_details =   DeliveryDetails.objects.create(
                order=order,
                name=self.delivery_details['name'],
                email=self.delivery_details['email'],
                phone_number = self.delivery_details['phone_number'],
                address = self.delivery_details['address']
                )
        
        return created_details.reference

    def orderFunc(self):
        try:
            order = Order.objects.get(email=self.delivery_details['email'], completed=False)
            order.delete()
        except:
            pass

        order_create = Order.objects.create(email=self.delivery_details['email'], completed=False)

        for i in self.cart_details:
            product = get_object_or_404(Product, id=i)
            item, created = OrderItem.objects.get_or_create(order=order_create, product=product)
            item.quantity = self.cart_details[i]
            item.save()

        
        return [order_create.get_total_cost, order_create.id]
#############################################################################################################                

    def cartToOrder(self):
        #if the user is not loggedin
        if not self.user_status:
            user_has_email = CustomUser.objects.filter(email=self.delivery_details['email'])
            if user_has_email:
                return False
            
            else:
                res_order = self.orderFunc()

                return res_order
            
        else:
            res_order = self.orderFunc()

            return res_order

    
    def processDeliveryInfo(self,order_id):
        try:
            order = get_object_or_404(Order,id=order_id)
            set_delivery_details = self._set_delivery_details(order)
            return set_delivery_details
        except:
            return False
   
        
