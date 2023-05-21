function deliveryData(){
    let the_user = document.querySelector('#user').innerHTML
    let body_data = {'user':the_user}
    const url = '/api/cart'
    const options ={
        method:'POST',
        headers:{'Content-Type':'application/json', 'X-CSRFToken':csrftoken},
        body:JSON.stringify(body_data)
    }
    fetch(url,options)
    .then((response)=> response.json())
    .then((data)=>{
        document.querySelector('#delivery-items').innerHTML = data['total-items']
        document.querySelector('#delivery-total').innerHTML = Intl.NumberFormat().format(data['total-cost'])
        the_total = data['total-cost']
    })
    .then((my_funcs)=>{
        //stop loading animation as data is gotten//
        animation.className = 'no-display'
        editCart()
    })
    .catch((error)=>console.log(error))
};
deliveryData()

function hideCart(){
    document.querySelector('.navbar-cart').style.opacity = 0
}

hideCart()


function storeDeliveryDetails(){
    const email = document.querySelector('[name="email"]').value
    const name = document.querySelector('[name="name"]').value
    const phone_number = document.querySelector('[name="phone-number"]').value
    const address = document.querySelector('[name="address"]').value
    const proceed_payment_btn = document.getElementById('submit-delivery-details')
    const waiting_anime = document.getElementById('waiting-animation')
    const make_payment = document.getElementById('make-payment')

    let body_data = {'email':email,'name':name, 'number':phone_number,'address':address}
    proceed_payment_btn.className='no-display'
    waiting_anime.className = 'waiting-animation'
    const options = {
        method:'POST',
        headers:{   
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify(body_data)
    };
    const url = '/api/delivery-details'
    fetch(url,options)
    .then((response)=> response.json())
    .then((data)=>{
        the_reference  = data.reference
        waiting_anime.className = 'no-display'
        make_payment.className = 'make-payment'
    })
}
const delivery_form = document.querySelector('#delivery-form')

delivery_form.addEventListener('submit', (e)=>{
    e.preventDefault()

    storeDeliveryDetails()
})

/////////////////////////////////////////////////////////////////////////////////////////

function payWithPaystack(){
    let loading = document.getElementById('preparing-ticket-animation');
    let name = document.querySelector('[name="name"]').value;
    let email = document.querySelector('[name="email"]').value;
    let phone = document.querySelector('[name="phone-number"]').value;
    let pub_key = document.querySelector('#paystack-pub-key').innerHTML;  
    let handler = PaystackPop.setup({
    key: pub_key,
    email: email,
    amount: the_total*100,
    currency: "NGN",
    ref: the_reference,
    metadata: {
       custom_fields: [
          {
              display_name: name,
              variable_name: "mobile_number",
              value:phone
          }
       ] 
    },
    callback: function(response){
        alert('Payment complete! Reference: ' + the_reference);
        window.location.href= '/api/payment-verify/'+the_reference;
    },
    onClose: function(){
        alert('window closed');
    }
  });
  handler.openIframe();
}