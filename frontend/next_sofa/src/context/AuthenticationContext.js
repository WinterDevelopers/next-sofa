
import {createContext, useEffect, useState} from "react";
import { cookiesAuth,getCookies } from "@/functionality/cookies_func";

import { useSelector,useDispatch } from "react-redux";
import { setUserStatus,removeUserStatus } from "@/redux/authState";
import {useRouter} from "next/router";

const AuthContext = createContext(null)

export default AuthContext

export const AuthProvider = ({children}) =>{
    const {userAuthState} = useSelector((state)=>state.userStatus)
    const dispatch = useDispatch()
    const router = useRouter();
    
    const loginPageFunc = async(e)=>{
        e.preventDefault()
        const callbackUrl = (router.query?.callbackUrl) ?? '/';
        console.log(router)
        const url = "api/login";
        const body = {
            'email':e.target.email.value,
            'password':e.target.password.value
        }
        const option = {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body:JSON.stringify(body)
        };
        const res = await fetch(url,option)
        if(res.status === 200){
            cookiesAuth('next-sofa-auth-session');
            dispatch(setUserStatus());
            history.back();
        }
        else{
            console.log(401,'failed');
        }
    }

    const registerApiFunc = async(e)=>{
        e.preventDefault()
        const body = {
            'username':e.target.username.value,
            'email':e.target.email.value,
            'password':e.target.password1.value,
            'password2':e.target.password2.value
        };
        const  url = 'api/register';
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        };
        const res = await fetch(url, option);
        console.log(res)
        if(res.status === 201){
            console.log('account successfully created');
            //activate ypur email
            //redirect to login page
        }
        else{
            console.log('failled to create account')
        }
    };


    let contextData = {
        loginFunc:loginPageFunc,
        registerFunc:registerApiFunc
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}