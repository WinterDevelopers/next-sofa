import loadingAnime from "@/functionality/loader_func";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function DeliveryDetails(){
    const[amount, setAmount] = useState(null);
    const[ref, setRef] = useState(null);
    const[email, setEmail] = useState(null);

    const make_payment = async()=>{
        if(typeof window !== 'undefined'){
            const paystk = await import('../../../utils/paystack');
            paystk.payWithPaystack(email,amount,ref)
        };
    };
    
    //const {shippingFunc} = useContext(AuthContext);
    const {cart} = useSelector((state)=>state.cart)
    const {userAuthState,address,city,state} = useSelector((state)=>state.userStatus);

    const shippingFunc= async(e)=>{
        e.preventDefault();
        loadingAnime(true);
        const url = 'api/shipping';
        let cart_ = new Object
            for(let id in cart){
                cart_[id]=cart[id].quantity;
            }
        let body_= null;
        if(userAuthState){
            console.log('logged in')
            body_ = {
            'phone_number':e.target.phone_number.value,
            'address':`${e.target.address.value},${e.target.city.value},${e.target.state.value}`,
            'cart':cart_,
            }
        }
        else if(!userAuthState){
            console.log('was not logged in')
            body_ = {
                'name':e.target.name.value,
                'email':e.target.email.value,
                'phone_number':e.target.phone_number.value,
                'address':`${e.target.address.value},${e.target.city.value},${e.target.state.value}`,
                'cart':cart_
            }
        }
        const body = JSON.stringify(body_);
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:body
        }
        const response = await fetch(url,option);
        const data = await response.json();
        e.target.className='no-display';

        setAmount(data.data.cost);
        setEmail(data.data.details.email);
        setRef(data.data.ref);
        makePayment(data);
        loadingAnime(false);
    };

    return<>
        <form name="shipping_form" class="shipping-form" id="delivery-form" onSubmit={shippingFunc}>
            <h2>Delivery Details</h2>
            <div style={{width:'2rem',height:'0.2rem',backgroundColor:'rgb(10, 10, 10)', position:'relative',top:'-0.5rem',borderRadius:'0.1rem',marginBottom:'3rem'}}></div>
            
            {userAuthState?null:<>
            <label for="" >Email</label>
            <br></br> 
            <input type="email" name="email" required></input>

            <label for="nnn">Name</label>
            <br></br>
            <input type="text" name="name" required ></input>
            </>}
            
            <label for="">Phone Number</label>
            <br></br>
            <input type="number" name="phone_number" required></input>

            <label for="">Address</label>
            <br></br>
            <input type="text" name="address" value={address??null} required></input>
            
            <label for="">City</label>
            <br></br>
            <input type="text" name="city" value={city??null} required></input>

            <label for="">State</label>
            <br></br>
            <input type="text" name="state" value={state??null} required></input>

            <input type="submit" value="Submit Details" class="" id="submit-delivery-details"></input>
            <div class="no-display" id="waiting-animation"></div>
        </form>
        <div className="no-display" id="shipping-details">
                
        </div>
        <button id="make-payment" className="no-display" type="button" onClick={make_payment}>Make Payment</button>
    </>
}

async function makePayment(data){
    const data_ = await data.data
    const cost = data_.cost
    const shipping_details = document.getElementById('shipping-details');
    shipping_details.className="shipping-details";
    shipping_details.innerHTML=`<h3>Delivery Details for purchase</h3>
                                <div class="shipping-details-info">
                                <div><span>Name: </span> <span>${data_.details.name}</span> </div>
                                <div> <span>Email: </span> <span>${data_.details.email}</span> </div>
                                <div> <span>Telephone Number: </span> <span>${data_.details.phone_number}</span> </div>
                                <div> <span>Address :</span> <span>${data_.details.address}</span> </div>
                                </div>`;
    document.querySelector('#make-payment').className='make-payment';
    
}
