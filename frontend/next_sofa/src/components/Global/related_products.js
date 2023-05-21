import Link from "next/link"
import nsapi from "../../../fetchurlconfig"

export default function RelatedProduct(props){

    return<>
        <div id={props.product_id}>
            <Link href={`/products/${props.product_slug}`}>
                <div class="product-image">
                <img src={nsapi+props.product_imageLink} alt={props.product_name}></img>
                </div>
                <h5>
                    {props.product_name}
                </h5>
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