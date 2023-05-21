import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:new Object,
    cart_details:{total_items:0},
    loading:false,
}

const calCart = (objArray)=>{
    let total_item = 0;
    let total_cost = 0.00;
    for(const id in objArray){
        total_item += objArray[id].quantity;
        let cost = objArray[id].price * objArray[id].quantity;
        total_cost += cost;
    }
    return [total_item,total_cost]
}
const cartDetailsFunc =(cartItems,func,cartDetails)=>{
    const [total_items, total_cost] = func(cartItems);
    cartDetails.total_items = total_items;
    cartDetails.total_cost = total_cost; 
}
const wasAdded = ()=>{
    document.querySelector('#added-to-cart').className="added-to-cart"
            setTimeout(()=>{
                document.querySelector('#added-to-cart').className="no-dispaly"   
            },1000)
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action) =>{
            let id = action.payload.id;
            let item = action.payload.item;
            //if new product is added to cart
            if(state.cart[id]== undefined){
                item['quantity']= 1;
                state.cart[id] = item;
                cartDetailsFunc(state.cart,calCart,state.cart_details) 
            }else{
                state.cart[id].quantity += 1;
                cartDetailsFunc(state.cart,calCart,state.cart_details)               
            };
            wasAdded();
        },
        removeFromCart:(state,action) =>{
            let id = action.payload.id;
            if(state.cart[id].quantity <= 1){
                delete state.cart[id]
                cartDetailsFunc(state.cart,calCart,state.cart_details)
            }else{
                state.cart[id].quantity -= 1;
                cartDetailsFunc(state.cart,calCart,state.cart_details) 
            }
            
        },
        resetCart:(state, action)=>{
            state.cart = new Object;
            state.cart_details = {total_items:0};
        }
    }
})

export const {removeFromCart,addToCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;