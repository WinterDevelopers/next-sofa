import Link from "next/link";
import nsapi from "../../../fetchurlconfig";
import { useEffect,useRef } from "react";
import CartItem from "./Cart_item";
//redux toolkit;
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart";

export default function CartPage(props){
    const dispatch = useDispatch();
    let func_lst = []
    useEffect(()=>{
        document.querySelector('#cart-details').innerHTML = '';
        const items = props.cart_item;
        for(const id in items){
            let item = items[id];
            const product_details = {img_link:item.img_link, name:item.name, price:item.price,quantity:item.quantity};
            const add =()=>dispatch(addToCart({id:id,item:product_details}));
            const remove =()=>dispatch(removeFromCart({id:id,item:product_details}));
            document.querySelector('.cart-details').innerHTML +=
            `<div class="cart-product">
                <div class="cart-product-id no-display"></div>
                    <img src=${nsapi+item.img_link} alt=""></img>
                    <div>
                        <h6>${item.name}</h6>
                        <p>&#8358; ${item.price}</p>
                        <div>
                            <button class="btn-shadow btn-minus">
                                <img src="../assets/icons/minus.svg"></img>
                            </button>
                            <div>
                                ${item.quantity}
                            </div>
                            <button class="btn-shadow btn-add">
                                <img src="../assets/icons/add.svg"></img>
                            </button>
                        </div>
                    </div>
            </div>`;
            const cart_fnx ={addFunc:add,removeFunc:remove}
            func_lst.push(cart_fnx)
        }
        let cart_add_btn = document.querySelectorAll('.btn-add');
        let cart_remove_btn = document.querySelectorAll('.btn-minus');
        for(let a =0; a<cart_add_btn.length;a++){
            cart_add_btn[a].addEventListener('click',func_lst[a].addFunc)
            cart_remove_btn[a].addEventListener('click',func_lst[a].removeFunc)
        };
        return()=>{func_lst=[]};
    },[props.cart_item])

    return <>
        <div id="cart-page" className={props.cart_page_visibility?'':'no-display'}>
    
            <section className={props.cart_animation? "cart-page cart-page-animation" :'cart-page cart-page-animation-reverse'}>
                {/* <div id="loader-container" className="no-display">
                    <div id="loader" className="loader"></div>
                </div> */}
                <div className="cart-page-header">
                    <div>
                        <h2>Cart</h2>
                    </div>
                    <div className="close-btn mobile-menu-close-btn btn-shadow" id="cart-close" onClick={props.toggle_cart_animation}>
                        <img src="../assets/icons/close.svg" alt=""></img>
                    </div>
                </div>
                <div className="cart-details" id="cart-details">
                </div>
                <div className="cart-summary">
                    <div style={{
                        width:'30%',
                        height:'0.5rem',
                        backgroundColor:'#838383', 
                        position:'relative',
                        top:'0rem',
                        borderRadius:'0.25rem',
                        margin:'0rem auto',
                        marginBottom:'4rem'}}>
                    </div>

                    <div className="cart-summary-sub-total">
                        <div>
                            <h6>Sub Total</h6>
                            <p id="sub-total">&#8358; {props.cart_total}</p>
                        </div>
                        <div>
                            <h6>Delivery & handeling</h6>
                            <p id="delivery">&#8358; 0.00</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="cart-summary-sub-total">
                        <div>
                            <h6>Total</h6>
                            <p id="total">&#8358; {props.cart_total}</p>
                        </div>
                    </div>
                    <div className="cart-summary-btn">
                        <Link href={"/shipping"}>
                            <button className="btn-shadow">
                            proceed to checkout
                            </button>
                        </Link>
                        
                    </div>
                    
                </div>
            </section>
        </div>
    </>
}