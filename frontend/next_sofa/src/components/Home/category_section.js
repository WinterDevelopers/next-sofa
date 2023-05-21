import Link from "next/link"
export default function CollectionSection(){
    return <>
        <section class="collection" id="collection">
        <h3>Our Collection</h3>
        <div style={{width:"2rem",height:"0.3rem",backgroundColor:"white",position:"relative",top:"0.8rem",borderRadius:"0.1rem",margin:"0rem auto"}}></div>
        <div>
           <Link  href={'/collection/bed-frame'}>
                <div class="collection-img-2 btn-shadow">
                    <img src="../assets/images/bed.png" alt=""></img>
                    <div>Bed frame</div>
                </div>
           </Link>
            
            <Link href={"/collection/tables"}>
                <div class="collection-img-1 btn-shadow">
                <img src="../assets/images/table.png" alt="" style={{width:"100%",transform:"translate(0%,10%)"}}></img>
                <div>Tables</div>
                </div>
            </Link>
            
            <Link href={"/collection/office-chair"}>
                <div class="collection-img-1 btn-shadow">
                <img src="../assets/images/office-chair.png" alt=""></img>
                <div>Office chair</div>
            </div>
            </Link>
            
            <Link href={"/collection/couch"}>
                <div class="collection-img-1 btn-shadow">
                <img src="../assets/images/couch.png" alt="" style={{width:"125%", transform:"translate(-10%,50%)"}}></img>
                <div style={{marginTop:"50%"}}>Sitting</div>
            </div>
            </Link>  
            
            <Link href={"/collection/cabinets"}>
                <div class="collection-img-1 btn-shadow">
                <img src="../assets/icons/wardrope.png" alt="" style={{width:"100%",transform:"translate(5%,-9%)",marginBottom:"-1rem"}}></img>
                <div>Cabinets</div>
            </div>
            </Link>
            
            <Link href={"/collection/dinning-sets"}>
                <div class="collection-img-2 btn-shadow">
                <img src="../assets/images/dining-table.png" alt=""></img>
                <div>Dinning Set</div>
            </div>
            </Link>
        </div>
    </section>
    </>
}