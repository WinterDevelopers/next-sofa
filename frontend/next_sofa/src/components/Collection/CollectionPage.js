export default function CollectionPage(props){
    return <>
        <section class="category">
            <div class="category-head">
                <div>
                    <h1>{props.name} collections & design</h1>
                    <span>
                        <h5>
                        Reviews[34]
                        </h5>
                        <img src="../assets/icons/star.png" class="review-star"></img>
                        <img src="../assets/icons/star.png" class="review-star"></img>
                        <img src="../assets/icons/star.png" class="review-star"></img>
                        <img src="../assets/icons/star.png" class="review-star"></img>
                    </span>
                </div>
            </div>
            <div style={{width:"20%",height:"0.6rem",backgroundColor: "rgb(197, 197, 197)",position: "relative",top:"1rem", borderRadius:"0.3rem",margin:"0rem auto",marginBottom:"3rem;"}}></div>
        </section>
    </>
};