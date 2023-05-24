import { useEffect, useRef, useState} from "react";
import nsapi from "../../../fetchurlconfig";
import imageSliderFunction from "../../functionality/product_Images_funtionality";

import RelatedProduct from "../Global/related_products";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart";


export default function Product(props){
    const dispatch = useDispatch();
    const [loadingState, setloadingState] = useState(true)
    const relatedProducts = props.related_products
    const product_details = {img_link:props.product_image, name:props.product_name, price:props.product_price};

    /* const run_once = useRef(true);
    const mmm = relatedProducts */
    useEffect(()=>{ 
        imageSliderFunction();
        setloadingState(false)

    },[props.product_name])

    return<>
        <div class="no-display" id="added-to-cart">
        {props.product_name} was added to your cart
        </div>
        <section id="product-app" class="product">
       <div id="product-id" class="no-display" data-product-id={props.product_id}></div>
        <div class="product-img-container">
            <img src={`${nsapi+props.product_image}`} alt="" class="product-images" id="imageURL"></img>
            {props.other_images.map(imgx=>{
                return(
                    <img key={imgx.id} src={`${nsapi+imgx.image}`} className="no-display product-images"></img>
                )
            })}
            <button  class="nxt-img">
                <img src="../assets/icons/right-arrow.svg"></img>
            </button>
            <button type="button" class="prev-img">
                <img src="../assets/icons/right-arrow.svg"></img>
            </button>
            <div class="bottom-indicators"></div>
        </div>
        <div class="product-info" id="product-info">
            <h1 id="product_name"> {props.product_name}</h1>
            <div class="product-review-star">
                <h5>
                Reviews[2]
                </h5>
                <img src="../assets/icons/star.png" alt=""></img>
                <img src="../assets/icons/star.png" alt=""></img>
                <img src="../assets/icons/star.png" alt=""></img>
                <img src="../assets/icons/star.png" alt=""></img>
                <div class="product-price" id="product_price">&#8358; {props.product_price}</div>
            </div>
            <div class="product-btns">    
                    <div class="add-to-cart btn-shadow" data-action="add" onClick={()=>dispatch(addToCart({id:props.product_id,item:product_details}))}>
                        <p>Add to cart</p>
                        <img src="../assets/icons/cart-light.svg" style={{color:'white'}}></img>
                    </div>
                
                <div class="call-to-order btn-shadow">
                    <a href="tel:+2348187241462" style={{color:'white',display:'flex',width:'100%'}}>
                        <p>Call to enquire</p>
                        <img src="../assets/icons/call.svg"></img>
                    </a>
                </div>
            </div>

            <p>
                {props.product_description}
            </p>
            {/* <script>
                let whatsapp = document.getElementById('whatsapp_btn')
                let imageURL = document.getElementById('imageURL')
                whatsapp.setAttribute('href', 'https://wa.me/2347063885377?text=I%20saw%20this%20'+`{{product.name}}`+'%20from%20your%20online%20store%20and%20i%20want%20to%20purchase%20it%20for%20price%20=N'+`{{product.price}}`+'%20link%20to%item:'+encodeURIComponent(imageURL.src));
            </script> */}
            <h6> <span><b>click here</b></span> to visit our physical showroom </h6>
        </div>
        </section>
        <section class="product-reviews">
        <h2>Customers Reviews</h2>
        <div class="product-review-summary">
            <div>
                <div>
                    <img src="../assets/icons/star.png" class="review-star"></img>
                    <img src="../assets/icons/star.png" class="review-star"></img>
                    <img src="../assets/icons/star.png" class="review-star"></img>
                    <img src="../assets/icons/star.png" class="review-star"></img>
                </div>
                <p>4 out of 5</p>
            </div>
        </div>
        </section>
            
        <section class="our-product">
            <h5>YOU MIGHT ALSO LIKE</h5>
            <div class="related-item-container">
                   
            <div class={loadingState?"skeleton-container":'no-display'}>
                <div class="skeleton skeleton-text"></div>
                <div class=" skeleton skeleton-text"></div>
                <div class=" skeleton skeleton-text"></div>
                <div class=" skeleton skeleton-text"></div>
                <div class=" skeleton skeleton-text"></div>
            </div>
            {relatedProducts.map(product=>{

                return(
                 
                    <RelatedProduct 
                    key={product.id}
                    product_id={product.id}
                    product_slug={product.slug}
                    product_name={product.name} 
                    product_imageLink={product.image}/>   
                )
            })}
            </div>
        </section>
    </>
}