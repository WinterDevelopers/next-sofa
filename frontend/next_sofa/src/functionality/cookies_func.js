
export function getCookies(name){
    let cookies = document.cookie.split(';');
    for(var a = 0; a < cookies.length; a++){
        let cookie_pair = cookies[a].split("=");
        if(name==cookie_pair[0].trim()){
            return decodeURIComponent(cookie_pair[1])
        };
    }
    return null;
};

export const cookiesFunc = ()=>{

    let cart_cookie = JSON.parse(getCookies("next-sofa-cart"));
    if(cart_cookie==undefined){
        let next_sofa = new Object;
        document.cookie = "next-sofa-cart="+JSON.stringify(next_sofa)+"; domain=;path=/;";
        cart_cookie = JSON.parse(getCookies("next-sofa-cart"));
    };

}

export const cookiesAuth = (authCookie)=>{
    let auth_cookie = JSON.parse(getCookies(authCookie));
    if(auth_cookie==undefined){
        const d = new Date();
        d.setTime(d.getTime()+(60*1000));
        let expires = `expires=${d.toUTCString()};`
        let user_status = true;
        document.cookie = `${authCookie}=`+JSON.stringify(user_status)+"; domain=;"+expires+"path=/;";
        auth_cookie = JSON.parse(getCookies(authCookie));
    };

}
