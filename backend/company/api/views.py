from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response

from django.http import HttpResponse

from ..getTopProductsView import topProducts
from ..collectionPage import CollectionPageView

@api_view(['GET'])
@permission_classes([AllowAny])
def getTopProducts(request):
    obj_query = topProducts()
    return Response(obj_query.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def CollectionPage(request, slug):

    collection = CollectionPageView(slug)
    collection_res = collection.getCollectionInfo()
    collection_products = collection.getCollectionProducts(collection_res.data)
    
    collection_data = {'collection':collection_res.data, 'collection_products':collection_products.data}

    return Response(collection_data)

#woud'nt be needing this anymore
@api_view(['POST'])
@permission_classes([AllowAny])
def tokenCookie(request):
    data = request.data
    print(data)
    res = HttpResponse("Cookie Set")
    res.set_cookie(key='SSIDACS',value=data['access'], httponly=True)
    res.set_cookie(key='SSIDRFH',value=data['refresh'], httponly=True)
    return res


@api_view(['GET'])
@permission_classes([AllowAny])
def authentication(request,slug):
    if slug=='acsx':
        if request.COOKIES['SSIDACS']:
            auth_token = request.COOKIES['SSIDACS']
        else:
            auth_token = 'something went wrong'
    elif slug=='rfhs':
        if request.COOKIES['SSIDRFH']:
            auth_token = request.COOKIES['SSIDRFH']
        else:
            auth_token = 'something went wrong'
    return Response(auth_token)

import json

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def userDetails(request):
    user = request.user
    user_details = {'email':str(user.email),'username':str(user.username), 'address':str(user.address), 'city':str(user.city), 'state':str(user.state), 'country':str(user.country)}
    user_details_ = user_details
    return Response(user_details_,200)

