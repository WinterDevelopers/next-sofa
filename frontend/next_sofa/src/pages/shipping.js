import CartShipping from "@/components/Shipping/cart_shipping";
import CheckoutSummary from "@/components/Shipping/checkout_Summary";
import DeliveryDetails from "@/components/Shipping/delivery_details";
import authSet from "@/functionality/auth";
import { useEffect } from "react";

let run_once = true;

function Shipping(){
    if(run_once){
        authSet(); 
        run_once = !run_once
    }
    useEffect(()=>{
    
        document.getElementById('navbar-cart').className='no-display';
        document.getElementById('cart-page').className='no-display';

        return()=>{document.getElementById('navbar-cart').className='navbar-cart';}
    },[])

    return<>
    
    <section class="shipping-page">
        <CartShipping/>
        <CheckoutSummary/>
        <DeliveryDetails/>
    </section>
    </>
};

export default Shipping