import nsapi from "../../../fetchurlconfig"

export default function CartItem(props){
    return <>
        <div class="cart-product">
        <div class="cart-product-id no-display">${props.id}</div>
        <img src={nsapi+props.image_link} alt=""></img>
        <div>
            <h6>${props.name}</h6>
            <p>${props.price}</p>
            <div>
                <button class="btn-shadow btn-minus">
                    <img src="../assets/icons/minus.svg"></img>
                </button>
                <div>
                    ${0}
                </div>
                <button class="btn-shadow btn-add">
                    <img src="../assets/icons/add.svg"></img>
                </button>
            </div>
        </div>
        </div>
    </>
}