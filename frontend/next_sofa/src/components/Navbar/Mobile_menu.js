import Link from "next/link"
import { useSelector } from "react-redux"

export default function MobileMenu(props){
    const {userAuthState} = useSelector((state)=>state.userStatus)

    return <>
            <div className={props.show_menu?'mobile-menu no-display-max' : 'mobile-menu-hide no-display'}  id="mobile-menu">
            <div className="close-btn mobile-menu-close-btn btn-shadow" id="mobile-menu-close" onClick={props.toggle_mobile_menu}>
                <img src="../assets/icons/close.svg" alt=""></img>
            </div>
            <div className="mobile-menu-option">
                <div onClick={props.toggle_mobile_menu}>
                        <Link href={'/'}>Home</Link>  
                    </div>
                    <div onClick={props.toggle_mobile_menu}>
                        <Link href={'/'}><img src="../assets/icons/right-arrow.svg" alt=""></img></Link>
                    </div>
                </div>
            <div className="mobile-menu-option" id="collection-side-bar">
                <div>
                    Collection
                </div>
                <div id="collection-side-bar-arrow">
                    <img src="../assets/icons/right-arrow.svg" alt=""></img>
                </div>
            </div>
            <div className="no-display" id="collection-side-bar-content">
                <div><a href="/collection/bed-frame">Bed frame</a></div>
                <div><a href="/collection/office-chair">Office chair</a></div>
                <div><a href="/collection/tables">Tables</a></div>
                <div><a href="/collection/cabinets">Cabinets</a></div>
                <div><a href="/collection/couch">Sitting</a></div>
                <div><a href="/collection/dinning-sets">Dinning Set</a></div>
            </div>
            <div className="mobile-menu-option">
                <div onClick={props.toggle_mobile_menu}>
                    <Link href={'/tracking'}>Track</Link>  
                </div>
                <div onClick={props.toggle_mobile_menu}>
                    <Link href={'/tracking'}><img src="../assets/icons/right-arrow.svg" alt=""></img></Link>
                </div>
            </div>
            
            <div className={userAuthState?"mobile-menu-option":"no-display"}>
                <div onClick={props.toggle_mobile_menu}>
                    <Link href={'/profile'}>Profile</Link>  
                </div>
                <div onClick={props.toggle_mobile_menu}>
                    <Link href={'/profile'}><img src="../assets/icons/right-arrow.svg" alt=""></img></Link>
                </div>
            </div>

            <div className="mobile-menu-option">
                <div onClick={props.toggle_mobile_menu}>
                    {userAuthState?<Link href={'/logout'}>Logout</Link>:<Link href={'/login'}>Login</Link>}
                    
                </div>
                <div onClick={props.toggle_mobile_menu}>
                    {userAuthState?<Link href={'/api/logout'}><img src="../assets/icons/right-arrow.svg" alt=""></img></Link>:
                    <Link href={'/login'}><img src="../assets/icons/right-arrow.svg" alt=""></img></Link>}
                </div>
            </div>
    
        </div>
    </>
}