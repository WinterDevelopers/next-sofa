import Link from "next/link"
import { nsmedia } from "../../../fetchurlconfig"

export default function Products(props){

    return<>
        <div id={props.product_id}>
            <Link href={`/products/${props.product_slug}`}>
                <div class="product-image">
                <img src={nsmedia+props.product_imageLink} alt={props.product_name}></img>
                </div>
                <h5>
                    {props.product_name}
                </h5>
                <p>
                  &#8358;  {Intl.NumberFormat().format(props.product_price)}
                </p>
                <div class="product-review-star">
                    <img src="../assets/icons/star.png" alt=""></img>
                    <img src="../assets/icons/star.png" alt=""></img>
                    <img src="../assets/icons/star.png" alt=""></img>
                    <img src="../assets/icons/star.png" alt=""></img>
                </div>
            </Link>
        </div>
    </>
};