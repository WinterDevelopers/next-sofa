export default function TopProductContainer(props){
    return <>
        <section class="our-product">
        <h3>Our Products</h3>
        <div style={{width:"2rem",height:"0.2rem",backgroundColor:"rgb(10, 10, 10)",position:"relative",top:"-0.5rem",borderRadius:"0.1rem",marginBottom:"3rem"}}></div>
        <div class="product-item-container">
            {props.children}
        </div>
        </section>
    </>
}