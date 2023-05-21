//import {loginPageFunc} from "./Authentication";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/AuthenticationContext";



export default function LoginPage(){
    let {loginFunc} = useContext(AuthContext);
   
    return <>

        <section style={{paddingTop:'3rem'}}>
            <form method='POST' class="sign-in-form" onSubmit={loginFunc}>
                <h2 style={{textAlign:'center'}}>Login</h2>
                
                <label>Email Address</label>
                <br></br>
                <input type="email" name="email" placeholder="Email" id="email"></input>
                <label>Password</label>
                <br></br>
                <input type="password" placeholder="Password" name="password" id="password"></input>
                <input type="submit" value="Login" class="btn-shadow" id="login-btn"></input>
                <div>
                    <div style={{width:'45%',height:'1px',backgroundColor:'#868686',position:'relative',borderRadius:'0.1rem',margin:'auto 0rem'}}></div>
                    <p>or</p>
                    <div style={{width:'45%',height:'1px',backgroundColor:'#868686',position:'relative',borderRadius:'0.1rem',margin:'auto 0rem'}}></div>
                </div>
                <button class="btn-shadow">Others</button>
                <p>Already have an account <span>click here</span></p>
            </form>
        </section>
    </>
}