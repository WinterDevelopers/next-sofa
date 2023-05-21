import { useState } from "react";
import nsapi from "../../../fetchurlconfig";
import Link from "next/link";


export default function Searchsection(props){

    const [searching, setSearching] = useState(false)

    const searchFunc = async (e) =>{
        e.preventDefault();
        let search_results = document.querySelector('#search-results');
        search_results.innerHTML='';
        const query = document.querySelector('#search-input').value;
        let query_ = query.replace(/^\s+|\s+$/gm,'')
        if(query_ == ''){
            return
        }
        setSearching(true);
        let url = nsapi+'store/api/search-products?search='+query_;
 
        const option = {
            method:'GET',
            headers:{'Content-Type':'application/json','Accept':'application/json'},
        }
        const res_ = await fetch(url, option)
        if( res_.status === 200){
            setSearching(false);
            const data = await res_.json();
            for(var a=0;a<data.length; a++){
           
                search_results.innerHTML += `
                <div>
                <a href="/products/${data[a].slug}"> 
                    <div class="product-image">
                        <img src="${data[a].image}" alt=""></img>
                    </div>
                    <h5>
                        ${data[a].name}
                    </h5>
                    <p>
                        N ${data[a].price}
                    </p>
                        <div class="product-review-star">
                        <img src="../assets/icons/star.png" alt=""></img>
                        <img src="../assets/icons/star.png" alt=""></img>
                        <img src="../assets/icons/star.png" alt=""></img>
                        <img src="../assets/icons/star.png" alt=""></img>
                    </div>
                </a>  
                </div>`
            }
            
            /* if (data.length<1){
                search_results.innerHTML = `<h2> No item that contains your input was found</h2>`
            } */
        }
        else{
            console.log('an error ocurred')
        }
    }
   
    return<>
        <section class={props.showSearchSection?'search-page':'no-display'} id="search-page">
            <div class="close-btn mobile-menu-close-btn btn-shadow" id="search-close" onClick={props.closeSearchPage}>
                <img src="../assets/icons/close.svg" alt=""></img>
            </div>

            <form onKeyUp={searchFunc} onSubmit={null} class="search-form" id="search-form" name="search-form">
                <input type="search" name="search_item" id="search-input" placeholder="what are you looking for ?"></input>
                <input type="submit" id="search-submit"></input>
                <img src="../assets/icons/search-icon.svg"></img>
            </form>

            <section class="our-product">
                <h5>DESCOVER MORE PRODUCTS</h5>
                <div style={{width:"3rem",height:"0.2rem",backgroundColor: "rgb(10, 10, 10)", position:"relative",top:"-0.5rem",borderRadius:"0.1rem",marginBottom:"3rem;"}}></div>
                <div class="product-item-container search-items">
                    {searching?<div class="search-animation"></div>:''}
                    <div id='search-results' className={searching?"no-display":''}>
                        
                    </div>
                </div> 
            </section> 
        </section>
    </>
}