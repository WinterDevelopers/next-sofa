import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { useSelector, useDispatch } from "react-redux";

export function middleware(request=NextRequest){
    let loginStatus = request.cookies.get('next-sofa-auth-session')?.value;
    
    if(loginStatus){
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher:['/register', '/login']
}