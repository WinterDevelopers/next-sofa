import { useState } from "react"
import { useSelector } from "react-redux"

export default function Profile(){
    const {userAuthState,address,city,state} = useSelector((state)=> state.userStatus)
    const [editDetails, setEditDetails] = useState(false)
    const ToggleEditDetails= ()=>{
        setEditDetails(!editDetails)
    }
    return<>
        <section class="profile-page">
            <div class="profile-upper">
                <img src="../assets/images/profile1.png" alt=""></img>
                <div>
                    <h5>winter developers</h5>
                    <h6>winterdevelopers@gmail.com</h6>
                </div>
                
            </div>

            <div>
                <h5>Delivery details</h5>
                <div class="profile-lower">
                    {editDetails?'': <div className="current-delivery-details">
                        <div>
                            <span>PHONE NUMBER:</span> 070243546789
                        </div>
                        <div>
                            <span>ADDRESS:</span>  {address}
                        </div>
                        <div>
                            <span>CITY:</span>  {city}
                        </div>
                        <div>
                            <span>STATE: </span> {state}
                        </div>

                        <button type="button" onClick={ToggleEditDetails}>Edit details</button>
                    </div>}
                    
                    {editDetails? <form name="" class="delivery-detail-form " id="delivery-form">            
                    
                    <label for="">Phone Number</label>
                    <br></br>
                    <input type="number" name="phone_number" value={"your number"} required></input>

                    <label for="">Address</label>
                    <br></br>
                    <input type="text" name="address" value={address} required></input>

                    <label for="">City</label>
                    <br></br>
                    <input type="text" name="city" value={city} required></input>

                    <label for="">State</label>
                    <br></br>
                    <input type="text" name="state" value={state} required></input>

                    <input type="submit" value="Update Details" class="" id="submit-delivery-details"></input>
                    <div class="no-display" id="waiting-animation"></div>
                </form>:''}
                

                </div>
            </div>

            <div>
                <h5>Purchased Items</h5>
                <div class="profile-lower-purchased-items">
                <div className="purchased-items">
                    <img src="../assets/images/dining-table.png"></img>
                    <div >
                        <div className="purchased-items-name">
                            Dining Table
                        </div>
                        <div className="purchased-items-price">
                            &#8358; 230,000
                        </div>
                    </div>
                    <div className="purchased-items-status-delivered">delivered</div>
                </div>
                <div className="purchased-items">
                    <img src="../assets/images/gaming-chair.png"></img>
                    <div >
                        <div className="purchased-items-name">
                            Gaming-chair
                        </div>
                        <div className="purchased-items-price">
                            &#8358; 150,000
                        </div>
                    </div>
                    <div className="purchased-items-status-on_transit">on_transit</div>
                </div>
                <div className="purchased-items">
                    <img src="../assets/images/lamp-holder.png"></img>
                    <div >
                        <div className="purchased-items-name">
                            Lamp holder
                        </div>
                        <div className="purchased-items-price">
                            &#8358; 30,000
                        </div>
                    </div>
                    <div className="purchased-items-status-processing">processing</div>
                </div>
                <div className="purchased-items">
                    <img src="../assets/images/lamp-holder.png"></img>
                    <div >
                        <div className="purchased-items-name">
                            Lamp holder
                        </div>
                        <div className="purchased-items-price">
                            &#8358; 30,000
                        </div>
                    </div>
                    <div className="purchased-items-status-processing">processing</div>
                </div>
                <div className="purchased-items">
                    <img src="../assets/images/lamp-holder.png"></img>
                    <div >
                        <div className="purchased-items-name">
                            Lamp holder
                        </div>
                        <div className="purchased-items-price">
                            &#8358; 30,000
                        </div>
                    </div>
                    <div className="purchased-items-status-processing">processing</div>
                </div>
                </div>
            </div>
             
        </section>
    
    </>
}