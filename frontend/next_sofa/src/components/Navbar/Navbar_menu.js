import Link from "next/link";import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function NavbarMenu(props){

    const {userAuthState} = useSelector((state)=>state.userStatus)

    useEffect(()=>{
        document.querySelector('#cart-item').innerHTML=props.cart_items_quantity;
    },[props.cart_items_quantity])
    return <>
        <nav className="navbar">
            <div>
                <div className="navbar-logo">
                    <Link href={'/'}><img src="../assets/icons/next-sofa-logo.png" alt=""></img></Link>
                </div>

                <div className="navbar-cart" id="navbar-cart" onClick={props.toggle_cart_animation}>
                    <img src="../assets/icons/cart.svg" alt=""></img>
                    <div className="cart-item" id="cart-item"></div>
                </div>

                <div className="navbar-options no-display-min">
                    <div>Collection</div>
                    <Link href={'/tracking'}>Track</Link>
                    {userAuthState?<Link href={'/profile'}>Profile</Link>:''}
                    {userAuthState?<Link href={'/api/logout'}>Logout</Link>:<Link href={'/login'}>Login</Link>}
                </div>
        
                <div className="search-btn" id="search-btn" onClick={props.searchPage}>
                    <img className="no-display-min"  src="../assets/icons/search-icon.svg" alt="" ></img>
                    <img className="no-display-max" src="../assets/icons/search-icon-black.svg" alt=""></img>
                </div>
                <div className="mobile-menu-btn no-display-max" id="mobile-menu-btn" onClick={props.toggle_mobile_menu}>
                    <img src="../assets/icons/double-menu-icon.svg" alt=""></img>
                </div>
            </div>
        </nav>
        <div id="loader-container" class="no-display">
            <div id="loader" class="loader"></div>
        </div>
    </>
}