import CollectionPage from "@/components/Collection/CollectionPage";
import TopProducts from "@/components/Global/top_products";
import TopProductContainer from "@/components/Global/top_products_container";
import { useRouter } from "next/router"

import nsapi from "../../../fetchurlconfig";

function CategoryPage({collection, collection_products}){
   /*  const router = useRouter();
    const query = router.query;
    const slug = query['category']
    console.log(slug) */
    /* console.log('info',collection)
    console.log('data',collection_products) */
    return <>
        <CollectionPage name={collection.name} details={collection.details} image_link={collection.image} />
        <TopProductContainer>
            {collection_products.map(product=>{
                return(
                    <TopProducts 
                    key={product.id}
                    product_id={product.id}
                    product_slug={product.slug}
                    product_name={product.name} 
                    product_imageLink={product.image} 
                    product_price={product.price}/>
                )
            })}
        </TopProductContainer>
    </>

}


export async function getServerSideProps(context){

    const slug = context.params['collection'];
    const url = `${nsapi}company/api/collection/${slug}`;
    const fetch_caterogy = await fetch(url);
    const data = await fetch_caterogy.json();
    const {collection} = data;
    const {collection_products} = data;
    return {props:{collection,collection_products}}

    }

export default CategoryPage