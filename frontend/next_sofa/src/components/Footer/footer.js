import { useState } from "react"
import FooterList from "./footerList"

export default function Footer(){    
    return <>
        <footer>
            <div class="footer-logo">
                <img src="../assets/icons/next-sofa-logo.png" alt=""></img>
            </div>
            <div class="footer-content">
                <div>
                    <FooterList header_name="Address">
                        <div>No. 125, Ikenegbu Layout,<br></br>
                            Owerri,<br></br>
                            Imo State. <br></br>
                            Nigeria. 
                        </div>
                    </FooterList>
                </div>
                <div>
                    <FooterList header_name="Products">
                        <div>Sittings</div>
                        <div>Tables</div>
                        <div>Cabinets</div>
                        <div>Office chair</div>
                        <div>Bed frame</div>
                        <div>Dinning-sets</div>
                    </FooterList>
                </div>
                <div>
                    <FooterList header_name="Contact">
                        <div>07063885377</div>
                        <div>Nextsofa@gmail.com</div>
                    </FooterList>
                </div>
            </div>
            <div class="footer-social">
                <div>
                    <div style={{width:"30%",height: "0.5px",backgroundColor: "white",position: "relative",top:"0.8rem"}}></div>
                    <div class="footer-social-icons">
                        <img src="../assets/icons/facebook.svg" alt=""></img>
                        <img src="../assets/icons/instagram.svg" alt=""></img>
                        <img src="../assets/icons/twitter.svg" alt=""></img>
                    </div>
                    <div style={{width:"30%",height:"0.5px",backgroundColor:"white",position:"relative",top:"0.8rem"}}></div>
                </div>
            </div>
            <div class="footer-others">
                <div>Copyright@2022</div>
                <div style={{fontSize:"x-small"}}>Terms and Conditions</div>
                <div style={{fontSize:"small",marginBottom:"0"}}>Developed by Winterdevelopers</div>
            </div>
        </footer> 
    </>
}