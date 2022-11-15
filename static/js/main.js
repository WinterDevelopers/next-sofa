let mobile_menu_btn = document.querySelector('#mobile-menu-btn')
let mobile_menu = document.querySelector('#mobile-menu')
let mobile_close = document.querySelector('#mobile-menu-close')
mobile_menu_btn.addEventListener('click', ()=>{
    console.log('winter')
    mobile_menu.className = 'mobile-menu no-display-max'
})
mobile_close.addEventListener('click', ()=>{
    mobile_menu.className = 'no-display'
})
let footer_list = document.querySelectorAll('.footer-content-list')
let show_footer = document.querySelectorAll('.show-footer-list')
let hide_footer = document.querySelectorAll('.hide-footer-list')

for(let i =0; i<show_footer.length; i++){
    show_footer[i].addEventListener('click', ()=>{
        show_footer[i].classList.replace('no-display-max','no-display')
        hide_footer[i].classList.replace('no-display','no-display-max')
        footer_list[i].classList.replace('no-display-min','winter-footer')
    })
    hide_footer[i].addEventListener('click', ()=>{
        show_footer[i].classList.replace('no-display','no-display-max')
        hide_footer[i].classList.replace('no-display-max','no-display')
        footer_list[i].classList.replace('winter-footer','no-display-min')
    })

}

let cart_btn = document.querySelector('.navbar-cart')
let cart_page = document.querySelector('#cart-page')
let cart_close = document.querySelector('#cart-close')
let cart_content = document.querySelector('.cart-page')
cart_btn.addEventListener('click',()=>{
    cart_content.className = "cart-page cart-page-animation"
    cart_page.className =''
})
cart_close.addEventListener('click',()=>{
    cart_content.className ='cart-page cart-page-animation-reverse'
    setTimeout(()=>{
        cart_page.className ='no-display'
    },695)
})
let search_page = document.querySelector('#search-page')
let search_btn = document.querySelector("#search-btn")
search_btn.addEventListener('click',()=>{
search_page.className = 'search-page'
})

let close_search = document.querySelector('#search-close')
close_search.addEventListener('click',()=>{
    search_page.className = 'search-page-close'
    setTimeout(()=>{
        search_page.className ='no-display'
    },490)
})
/* console.log(show_footer) */
let aaa = 10000000000
let faaa = new Intl.NumberFormat().format(aaa)
console.log(faaa)