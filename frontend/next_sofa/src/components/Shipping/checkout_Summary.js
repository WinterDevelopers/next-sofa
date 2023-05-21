import { useSelector } from "react-redux"

export default function CheckoutSummary(){
    const {cart_details} = useSelector(state=> state.cart)

    return<>
        <div class="shipping-summary">
            <div>
                <div>
                    Items:
                </div>
                <div id="delivery-items">
                    {cart_details.total_items}
                </div>
            </div>
            <div>
                <h3>
                    Total:
                </h3>
                <h4 id="delivery-total">
                    &#8358; {cart_details.total_cost}
                </h4>
            </div>
        </div>
    </>
}