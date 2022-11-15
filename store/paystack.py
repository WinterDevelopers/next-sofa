from django.conf import settings

import requests

class Paystack():
     
    base_url = 'https://api.paystack.co'

    def verifyPayment(self, ref,*args, **kwargs):
        SEC_KEY =  'sk_test_7515a3e58c6c638eefbc4c375567b051b869d0fc'

        path = f'/transaction/verify/{ref}'
        headers = {
            'Authorization':f'Bearer {SEC_KEY}',
            'Content-Type':'application/json',
        }
        url = self.base_url+path
        response = requests.get(url,headers=headers)
        
        if response.status_code == 200:
            response_data = response.json()
            return response_data['status'],response_data['data']

        response_data = response.json()
        return response_data['status'],response_data['message']
