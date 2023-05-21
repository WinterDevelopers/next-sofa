import { useEffect, useState } from "react"
import { cookiesFunc } from "@/functionality/cookies_func";

import MobileMenu from "./Mobile_menu";
import NavbarMenu from "./Navbar_menu";
import CartPage from "./Cart_page";
import Searchsection from "./Search_page";

import { useSelector} from "react-redux";

export default function NavBar(){
    const {cart, cart_details} = useSelector((state)=>state.cart)
    let [mobileMenuVisibility, setMobileMenuVisibility] = useState(false);
    let [cartVisibility, setCartVisiblity] = useState(false);
    let [cartAnimation, setCartAnimation] = useState(false);
    let [searchPage, setSearchPage] = useState(false);
    
    const cartAnimationTimeout = ()=>{
        setTimeout(() => {
            setCartVisiblity(!cartVisibility);
        }, 670);
    }
    const setCartPage = ()=>{
        if(cartVisibility){
            cartAnimationTimeout();
        }
        else{
            setCartVisiblity(!cartVisibility)
        }
    }
    const cartAnimationFunc = ()=>{
        setCartAnimation(!cartAnimation)
        setCartPage()
    }
    const searchVisiblity = ()=>{
        setSearchPage(!searchPage)
    }
    const setVisibility =()=>{
        setMobileMenuVisibility(!mobileMenuVisibility)
    };

    useEffect(()=>{
        cookiesFunc();
        // return()=>{
        //     cookiesFunc();
        // }
    },[]);
    
    return <>
        <NavbarMenu toggle_mobile_menu={setVisibility} cart_animation={cartAnimation} toggle_cart_animation={cartAnimationFunc} cart_items_quantity={cart_details.total_items} searchPage={searchVisiblity}/>
        <MobileMenu show_menu={mobileMenuVisibility} toggle_mobile_menu={setVisibility}/>
        <CartPage cart_page_visibility={cartVisibility} cart_animation={cartAnimation} toggle_cart_animation={cartAnimationFunc} cart_item={cart} cart_total={cart_details.total_cost}/>
        <Searchsection showSearchSection={searchPage} closeSearchPage={searchVisiblity}/>
    </>
}