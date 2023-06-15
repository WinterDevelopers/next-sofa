import { useEffect, useRef, useState} from "react";

import { nsmedia } from "../../../fetchurlconfig";
import imageSliderFunction from "../../functionality/product_Images_funtionality";

import RelatedProduct from "../Global/related_products";
import Reviews from "./reviews";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart";


export default function Product(props){
    const dispatch = useDispatch();
    const [loadingState, setloadingState] = useState(true)
    const [reviewForm, setReviewForm] = useState(false)
    const relatedProducts = props.related_products
    const product_details = {img_link:props.product_image, name:props.product_name, price:props.product_price};
   
    //userstate on redux
    const {userAuthState} = useSelector((state)=>state.userStatus)
    
    // reviews for this extact product
    const reviews = props.reviews;
    const review_list = [];
    //loop the object and convert to list
    for(let x in reviews){
        review_list.push(reviews[x])
    };
    //function called to rate a product
    const rateFunc =async(e)=>{
        e.preventDefault();
        const rate =await import("@/functionality/rate_product");
        rate.rateProductFunc()
    }

    /* const run_once = useRef(true);
    const mmm = relatedProducts */
    useEffect(()=>{ 
        imageSliderFunction();
        setloadingState(false)
        if (userAuthState == true){
            async function userToReview(){
                const url = '/api/userreview'
                const body = {'id':props.product_id}
                const option = {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(body)
                }
                const apiRes = await fetch(url,option)
                if (apiRes.status === 200) {
                    const data = await apiRes.json()
                    if(data){
                        if(data['condition']===true){
                            setReviewForm(true)
                        }
                        else{
                            setReviewForm(false)
                        }
                    }
                }
            }
            userToReview()
        }
    },[props.product_name, reviewForm])

    return<>
        <div class="no-display" id="added-to-cart">
        {props.product_name} was added to your cart
        </div>
        <section id="product-app" class="product">
       <div id="product-id" class="no-display" data-product-id={props.product_id}></div>
        <div class="product-img-container">
            <img src={`${nsmedia+props.product_image}`} alt="" class="product-images" id="imageURL" loading="lazy" width={200} height={200}></img>
            {props.other_images.map(imgx=>{
                return(
                    <img key={imgx.id} src={`${nsmedia+imgx.image}`} className="no-display product-images" loading="lazy" width={200} height={200}></img>
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
                <div class="product-price" id="product_price">&#8358; {Intl.NumberFormat().format(props.product_price)}</div>
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
        <section class="add-review">
        {reviewForm? <div>
        <h3>Rate this product</h3>
        <h6>Tell others what you think about this product</h6>
        </div>:''}
        
        {reviewForm?
            <form action="" method="post">
            <div class="review-form">
                 <input type="radio" name="rate" id="rating-btn5" data-rating="5" hidden></input>
                 <label class="review-form-label" for="rating-btn5"><span class="review-form-span">Excellent</span></label>
    
                 <input type="radio" name="rate" id="rating-btn4" data-rating="4" hidden></input>
                 <label class="review-form-label" for="rating-btn4"><span class="review-form-span">Satisfied</span></label>
    
                 <input type="radio" name="rate" id="rating-btn3" data-rating="3" hidden></input>
                 <label class="review-form-label" for="rating-btn3"><span class="review-form-span">Good</span></label>
    
                 <input type="radio" name="rate" id="rating-btn2" data-rating="2" hidden></input>
                 <label class="review-form-label" for="rating-btn2"><span class="review-form-span">Not satisfied</span></label>
    
                 <input type="radio" name="rate" id="rating-btn1" data-rating="1" hidden></input>
                 <label class="review-form-label" for="rating-btn1"><span class="review-form-span">Disappointing</span></label>
            </div>
            <textarea class="rating-description" type="" name="review" id="" placeholder="describe your experience on this product"></textarea>
            <input class="submit-review btn-shadow" type="submit" value="Submit review" onClick={rateFunc}></input>
         </form> 
        :''}
    </section>
        <div class="product-reviews-container">
        {review_list.map(review=>{
            return(
                <Reviews
                name={review.name}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
                />
            )
        })}
    </div>
    <div class="view-more"> view more </div>
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