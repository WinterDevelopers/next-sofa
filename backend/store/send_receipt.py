from django.core.mail import EmailMessage
from django.conf import settings

def send_receipt(track_id, email):
    subject = 'Your receipt from next sofa'
    txt_ ='your tracking number for your purchase is: <b>'+track_id+'</b> you can use this to monitor your item by tracking status '
    recipient_list = [email,]
    print('sending mail')
    email= EmailMessage(subject,txt_,to = recipient_list)
    try:
        email.send()
        res_ = True
        print('sent mail')
    except:
        print('sent no mail')
        res_ = False

    return res_