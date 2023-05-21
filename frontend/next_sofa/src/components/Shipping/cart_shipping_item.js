import nsapi from "../../../fetchurlconfig"

export default function ShippingItems(props){
    return <>
        <div>
            <div>
                <img src={nsapi+props.image_link} className="summary-cart-img"></img>
            </div>
            <div className="summary-cart-details"> 
                <div>
                    <h5>{props.name}</h5>
                    <p> &#8358; {props.price}</p>
                </div>
                <div className="summary-cart-qty">
                    <span>&times;</span>
                    <span> {props.quantity} </span>
                </div>
            </div>
        </div>
    </>
}