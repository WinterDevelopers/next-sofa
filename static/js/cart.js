let cart_detials = document.querySelector('.cart-details')
let animation = document.querySelector('#loader-container')

function cart(){
    //start loading animation
    animation.className = 'loader-container'
    let the_user = document.querySelector('#user').innerHTML
    let body_data = {'user':the_user}
    const url = '/api/cart'
    const options ={
        method:'POST',
        headers:{'Content-Type':'application/json', 'X-CSRFToken':csrftoken},
        body:JSON.stringify(body_data)
    }
    fetch(url,options)
    .then((response)=> response.json())
    .then((data)=>{
        var items = data['total-items']
        document.querySelector('#cart-item').innerHTML = data['total-items']
        if(the_user=='AnonymousUser'){
            cookiesSetCartPage(data)
        }
        else{
            setCartPage(data)
        }  
    })
    .then((my_funcs)=>{
        //stop loading animation as data is gotten//
        animation.className = 'no-display'
        editCart()
    })
    .catch((error)=>console.log(error))
    
}
cart()
//this will fill the cart page with the products the user has selected
function setCartPage(items){
    cart_detials.innerHTML = ''
    let my_order = items['items']
    let order_product = items['products']
    document.querySelector('#total').innerHTML = items['total-cost']
    document.querySelector('#sub-total').innerHTML = items['total-cost']
    for(var i =0; i < my_order.length; i++){
        cart_detials.innerHTML +=  `<div class="cart-product">
        <div class="cart-product-id no-display">${order_product[i][my_order[i]['id']]['id']}</div>
        <img src="${order_product[i][my_order[i]['id']]['image']}" alt="">
        <div>
            <h6>${order_product[i][my_order[i]['id']]['name']}</h6>
            <p>${order_product[i][my_order[i]['id']]['price']}</p>
            <div>
                <button class="btn-shadow btn-minus">
                    <img src="/static/icons/minus.svg"></img>
                </button>
                <div>
                    ${my_order[i]['quantity']}
                </div>
                <button class="btn-shadow btn-add">
                    <img src="/static/icons/add.svg"></img>
                </button> 
            </div>
        </div>
    </div>`;  
    }
   
}

function cookiesSetCartPage(items){
    cart_detials.innerHTML = ''
    let order_product = items['products']
    cookies = JSON.parse(getCookies('next-sofa'))
    document.querySelector('#total').innerHTML = items['total-cost']
    document.querySelector('#sub-total').innerHTML = items['total-cost']
    for(var i =0; i < order_product.length; i++){
        qty = cookies[order_product[i]['id']]
        cart_detials.innerHTML +=  `<div class="cart-product">
        <div class="cart-product-id no-display">${order_product[i]['id']}</div>
        <img src="${order_product[i]['image']}" alt="">
        <div>
            <h6>${order_product[i]['name']}</h6>
            <p>${order_product[i]['price']}</p>
            <div>
                <button class="btn-shadow btn-minus">
                    <img src="/static/icons/minus.svg"></img>
                </button>
                <div>
                    ${qty['quantity']}
                </div>
                <button class="btn-shadow btn-add">
                    <img src="/static/icons/add.svg"></img>
                </button>
            </div>
        </div>
        </div>`
    }
}

function cart_fetch(id,operation){
    //start loading animation
    animation.className = 'loader-container'
    let body_data = {'id':id, 'operation':operation}
    const url = '/api/cart-func'
    const options ={
        method:'POST',
        headers:{'Content-Type':'application/json', 'X-CSRFToken':csrftoken},
        body:JSON.stringify(body_data)
    }
    fetch(url,options)
    .then((response)=> response.json())
    .then((data)=>{
        console.log('nah me',data)
        document.cookie = "next-sofa ="+JSON.stringify(data)+";SameSite=None;Secure=true;domain=;path=/"
        cart()
        //stop loading animation as data is gotten//
        animation.className = 'no-display'
    })
    .catch((error)=>console.log(error))
}

function editCart(){
    let cart_product_id = document.querySelectorAll('.cart-product-id')
    let btn_minus = document.querySelectorAll('.btn-minus')
    let btn_add = document.querySelectorAll('.btn-add')
    let id_list = []
    for(var i=0; i<cart_product_id.length;i++){
        id_list.push(cart_product_id[i].innerHTML)
    }

    for(var i =0; i<btn_add.length; i++){
        let the_product = id_list[i]
        btn_add[i].addEventListener('click',()=>{
            
            cart_fetch(the_product,'add')
        });
        btn_minus[i].addEventListener('click',()=>{
            cart_fetch(the_product, 'remove')
        })
      
    }
}
