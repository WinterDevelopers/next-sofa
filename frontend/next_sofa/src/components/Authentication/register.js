import { useRef, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthenticationContext";
import nsapi from "../../../fetchurlconfig";


export default function RegisterPage(){
    let {registerFunc}=useContext(AuthContext)
    return<>
     <section style={{paddingTop:'3rem'}}>
        <form method="POST" class="sign-in-form" onSubmit={registerFunc}>
            <h2 style={{textAlign:'center'}}>Register</h2>
            <input type="text" placeholder="username" name="username" id="username"></input>
            <input type="email" placeholder="email" name="email" id="email"></input>
            <input type="password" placeholder="password" name="password1" id="password1"></input>
            <input type="password" placeholder="password-again" name="password2" id="password2"></input>
            <input type="submit" value="Register" class="btn-shadow" id="register-btn"></input>
            
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