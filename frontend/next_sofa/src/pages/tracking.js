import loadingAnime from "@/functionality/loader_func";
import {nsmedia} from "../../fetchurlconfig";
import { useEffect } from "react"

function Tracking(){
    async function getOrderedItemStatus(e){
        e.preventDefault()
        loadingAnime(true)
        const url = 'api/trackitem'
        const option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(e.target.tracking_number.value)
        }
        const res_ = await fetch(url,option)
        const data = await res_.json();
        if(res_.status == 200){
            console.log(data)
            const result = document.getElementById('tracking-result')
            result.innerHTML=`
            <div class="tracking-result">
            <div>#${data.data.details.order}</div>
            <div>Address: ${data.data.details.address} </div>
            <div>Status: <span class="${data.data.details.delivery_status}" >${data.data.details.delivery_status}</span></div>
            <div>Date Ordered: ${data.data.details.date}</div>
            </div>
            <div class="profile-lower-purchased-items" style='height:fit-content'>
            ${data.data.items.map(item => {
                return(
                    `<div class="purchased-items">
                    <img src="${nsmedia+item.image}"></img>
                    <div>
                        <div class="purchased-items-name">
                            ${item.name}
                        </div>
                    </div>
                    <div class="purchased-items-status-delivered">${item.price}</div>
                    </div>`
                )
            })}
            </div>
            `
        }
        else{
            const result = document.getElementById('tracking-result')
            result.innerHTML=`<div class="tracking-result">${data.error}</div>`
        }
       loadingAnime(false)
    }

    return <>
        <section className="tracking-section">
            <form onSubmit={getOrderedItemStatus}>
                <input type="text" name="tracking_number" placeholder="input your tracking ID"></input>
                <input type="submit" value={'Track'}></input>
            </form>
            <div id="tracking-result"></div>
        </section>
        
    </>
}

export default Tracking