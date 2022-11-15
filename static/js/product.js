let product_id = document.querySelector('#product-id').innerHTML
let my_user = document.querySelector('#user').innerHTML

//create our vue app using line
const {createApp} = Vue
createApp({
    //template case for rendering values
    compilerOptions : {'delimiters':['[[',']]']},
    //this data method contains data that can be accessed in the template
    data(){
        return{
            product:'',
            images:'',
        }
    },
    methods:{
        //this will get the data of the specific item we need
        getProduct(){
            
            const url = '/api/product-data'
            let body_data = {'id':product_id}
            const options = {
                method:'POST',
                headers:{'Content-Type':'application/json','X-CSRFToken':csrftoken},
                body:JSON.stringify(body_data)
            }
            fetch(url,options)
            .then((response)=>response.json())
            .then((data)=>{
                let product_info = document.querySelector('#product-info')
                let skeleton_text = document.querySelector(".skeleton-container")
                this.product = data.product_info
                this.images = data.product_images
                console.log(product_info)
                skeleton_text.className = "no-display"
                product_info.className = "product-info"
            })
            .then(myJsMethods=>{
                slider(1);
              })
            .catch((error)=>console.log(error))
        },

        addToCart(){
            let animation = document.querySelector('#loader-container')
            //start loading animation
            animation.className = 'loader-container'
            
            if (my_user=='AnonymousUser'){
                
                if(my_cart[this.product.id] == undefined){
                    my_cart[this.product.id]={'quantity':1}
                }
                else{
                    my_cart[this.product.id]['quantity']+=1
                }
                document.cookie = "next-sofa ="+JSON.stringify(my_cart)+"; domain=;path=/"
                
                cart()
                //stop loading animation as data is gotten//
                animation.className = 'no-display' 
                document.querySelector('#added-to-cart').className="added-to-cart"
                
                setTimeout(()=>{
                    document.querySelector('#added-to-cart').className="no-dispaly";
                     
                },3000)
            }
            else{
                let body_data = {'id':this.product.id}
                const url = '/api/add-to-cart';
                const options = {
                    method:'POST',
                    headers:{'Content-Type':'application/json','X-CSRFToken':csrftoken},
                    body:JSON.stringify(body_data)
                }
                fetch(url, options)
                .then((response)=>response.json())
                .then((data)=>{
                    console.log('was added')
                    cart()
                    
                    //stop loading animation as data is gotten//
                    animation.className = 'no-display'
                    document.querySelector('#added-to-cart').className="added-to-cart"
                    setTimeout(()=>{
                        document.querySelector('#added-to-cart').className="no-dispaly"   
                    },3000)
                })
                .catch((error)=>console.log(error))
            }
            
        },
    },
    
    created:function(){
        this.getProduct()
    }
}).mount('#product-app')
//////////////////////////////////////////////////////////////////////
//for the project page
let slide_number = 1

//add the extact number of bottom bars to match the number of images
function bottomIndicator(){
    let product_images = document.querySelectorAll('.product-images')
    let bottom_indicators = document.querySelector('.bottom-indicators')

    bottom_indicators.innerHTML=''
    for(var i=0; i<product_images.length; i++){
        bottom_indicators.innerHTML+=`<span class="bottom-indicator" onclick = "change_bottom_indicator(${i+1})"></span>`
    }
}

//remove the display from every product image
function productImage(item, index){
    item.className = "no-display product-images"
}
//change the images as the user is clicking
function change_image(n){
    slider(slide_number+=n)
}
//change to the image when the user click the bottom bar
function change_bottom_indicator(n){
    slider(slide_number=n)
}

//handle the image to be displayed
function slider(number){
    bottomIndicator();
    let product_images = document.querySelectorAll('.product-images')
    //get the arrray of the bottom bar
    let bottom_dash = document.querySelectorAll('.bottom-indicator')
    //apply a function to hide all images 1st
    product_images.forEach(productImage)
    //get the number of images the product has
    let imgs_len = product_images.length

    //check that the length does not exceed the number of images
    if (number >imgs_len){slide_number = 1}
    else if(number<1){slide_number=imgs_len}

    //change the class of the current image to show the image
    product_images[slide_number-1].className ='product-images';

    //change all the bottom bar to not active
    for(var i = 0; i<bottom_dash.length; i++){
        bottom_dash[i].className ='bottom-indicator' 
    };
    //activate the selected in reference to the images
    bottom_dash[slide_number-1].className ='bottom-indicator-active';
}
