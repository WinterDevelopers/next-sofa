import Product from "@/components/Product/product"
import nsapi from "../../../fetchurlconfig";
import authSet from "@/functionality/auth";

let run_once = true;

function ProductPage({product,product_image,related_products}){
    if(run_once){
       authSet(); 
       run_once = !run_once
    }
    
    //console.log(product_image)
    return<>
        <Product
        product_id={product.id}
        product_name={product.name} 
        product_description={product.description} 
        product_price={product.price} 
        product_image={product.image} 
        other_images={product_image}
        related_products={related_products}
        />
    </>
}

export async function getServerSideProps(context){
    const slug = context.params['product']
    const url = `${nsapi}store/api/${slug}/`
    const fetched_data = await fetch(url)
    const product_data = await fetched_data.json()
    const {product,product_image,related_products} = product_data

    return {props:{product, product_image, related_products}}
}

export default ProductPage