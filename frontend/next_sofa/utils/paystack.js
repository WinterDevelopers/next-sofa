import PaystackPop from '@paystack/inline-js';
import nsapi from '../fetchurlconfig';
import loadingAnime from '@/functionality/loader_func';
import {redirect} from 'next/navigation'



export function payWithPaystack(email,amout,ref) {
    
    loadingAnime(true)
    const paystack = new PaystackPop();
    paystack.newTransaction({
    key: 'pk_test_d62d0abc9b452417dcded834b109dfe257cd425a', // Replace with your public key
    email: email,
    amount: amout * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: ref, // Replace with a reference you generated
    onSuccess:(response) => {
      //this happens after the payment is completed successfully
      let reference = response.reference;
      ApiVerifyPayment(reference);
      //alert(apiVerifyRes + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onCancel: () => {
      loadingAnime(false)
      alert('Transaction was not completed, window closed.');
    },
  });
}

export const ApiVerifyPayment = async(reference)=>{
  const url = `${nsapi}store/api/verify-payment/${reference}`;
  
  let response = await fetch(url);
  let data = await response.json();
  if(response.status == 201 || response.status == 202){
    loadingAnime(false)
    window.location.replace(`/completedordered/${data}`)
  }
  else{
    return data
  }
  
}