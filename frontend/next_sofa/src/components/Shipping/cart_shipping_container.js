import { useSelector } from "react-redux";
import ShippingItems from "./cart_shipping_item";

export default function ShippingContainer(){
    const {cart} = useSelector((state)=> state.cart)
    let cart_ = []
    for(const id in cart){
        cart_.push(cart[id])
    }
    return <>
        {cart_.map(item=>{
            return(
                <ShippingItems name={item.name} image_link={item.img_link} price={item.price} quantity={item.quantity}/>
            )
        })}
    </>
}