import Link from "next/link"
export default function CollectionSection(){
    return <>
        <section class="collection" id="collection">
        <h3>Our Collection</h3>
        <div style={{width:"2rem",height:"0.3rem",backgroundColor:"white",position:"relative",top:"0.8rem",borderRadius:"0.1rem",margin:"0rem auto"}}></div>
        <div>
           <Link  href={'/collection/bed-frame'}>
                <div class="collection-img btn-shadow">
                    <img src="../assets/images/bed.png" alt=""></img>
                    <div>Bed frame</div>
                </div>
           </Link>
            
            <Link href={"/collection/tables"}>
                <div class="collection-img btn-shadow">
                <img src="../assets/images/table.png" alt=""></img>
                <div>Tables</div>
                </div>
            </Link>
            
            <Link href={"/collection/office-chair"}>
                <div class="collection-img btn-shadow">
                <img src="../assets/images/office-chair.png" alt=""></img>
                <div>Office chair</div>
            </div>
            </Link>
            
            <Link href={"/collection/couch"}>
                <div class="collection-img btn-shadow">
                <img src="../assets/images/couch.png" alt=""></img>
                <div>Sitting</div>
            </div>
            </Link>  
            
            <Link href={"/collection/cabinets"}>
                <div class="collection-img btn-shadow">
                <img src="../assets/icons/wardrope.png" alt=""></img>
                <div>Cabinets</div>
            </div>
            </Link>
            
            <Link href={"/collection/dinning-sets"}>
                <div class="collection-img btn-shadow">
                <img src="../assets/images/dining-table.png" alt=""></img>
                <div>Dinning Set</div>
            </div>
            </Link>
        </div>
        
    </section>
    </>
}