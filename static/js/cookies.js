//let work with cookies
function getCookies(name){
    //get the cookie of the user's browser
    let my_cookie = document.cookie.split(';');
    for(var i=0;i <my_cookie.length; i++){
        let cookie_pair = my_cookie[i].split('=')
        if( name == cookie_pair[0].trim()){
            return decodeURIComponent(cookie_pair[1])
        }
    }
    return null
}

let my_cart = JSON.parse(getCookies("next-sofa"))

if(my_cart == undefined){
    let next_sofa = new Object
    document.cookie = "next-sofa ="+JSON.stringify(next_sofa)+"; domain=;path=/"
    my_cart = JSON.parse(getCookies("next-sofa"))
}