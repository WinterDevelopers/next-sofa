import AboutSection from "@/components/Home/about_section";
import CollectionSection from "@/components/Home/category_section";
import Promts from "@/components/Home/promts";
import Subscribe from "@/components/Home/subscribe";
import TopBanner from "@/components/Home/top_banner";
import Products from "@/components/Global/top_products";
import TopProductContainer from "@/components/Global/top_products_container";

import nsapi from "../../fetchurlconfig"

function Home({topProducts_data}) {
  return (
    <>
     <TopBanner></TopBanner>
     <Promts></Promts>
     <CollectionSection>
      
     </CollectionSection>
     <TopProductContainer>
        {topProducts_data.map(product => {
            return(
              <Products 
              key={product.id}
              product_id={product.id}
              product_slug={product.slug}
              product_name={product.name} 
              product_imageLink={product.image} 
              product_price={product.price}/>
            )
          })}
     </TopProductContainer>
      
     <AboutSection></AboutSection>
     <Subscribe></Subscribe>
    </>
  )
}
export async function getServerSideProps(){
  const fetch_topProducts = await fetch(`${nsapi}company/api/top-products`)
  const topProducts_data = await fetch_topProducts.json()

  return {props:{topProducts_data}}
}

export default Home