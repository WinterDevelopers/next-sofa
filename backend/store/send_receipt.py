from django.core.mail import send_mail
from django.conf import settings

def send_receipt(track_id, email):
    subject = 'Your receipt from next sofa'
    txt_ ='your tracking number for your purchase is: <b>'+track_id+'</b> you can use this to monitor your item by tracking status '
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email,]
    try:
        send_mail(subject,txt_,from_email,recipient_list)
        res_ = True
    except:
        res_ = False

    return res_