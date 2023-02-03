let search_form = document.querySelector('#search-submit')
let search_results = document.querySelector('#search-results')

search_form.addEventListener('click',
function (e){
    e.preventDefault()
    console.log('searching')
    let item = document.querySelector('#search-input').value
    let url = '/api/search-products?search='+item;
    console.log(item)
    const option = {
        method:'GET',
        /* headers:{'Content-Type':'application/json','X-CSRFToken':csrftoken}, */
        /* body:'pending' */
    }
    search_results.innerHTML = '<div class="search-animation"></div>'
    fetch(url, option)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        
        search_results.innerHTML = ''
        if (data.length<1){
            search_results.innerHTML = `<h2> No item that contains your input was found</h2>`
        }
        else{
            for(var a=0;a<data.length; a++){
           
                search_results.innerHTML += `
                <div>
                <a href="/store/${data[a].slug}"> 
                    <div class="product-image">
                        <img src="${data[a].image}" alt="">
                    </div>
                    <h5>
                        ${data[a].name}
                    </h5>
                    <p>
                        N ${data[a].price}
                    </p>
                    <div class="product-review-star">
                        <img src="/static/icons/star.png" alt="">
                        <img src="/static/icons/star.png" alt="">
                        <img src="/static/icons/star.png" alt="">
                        <img src="/static/icons/star.png" alt="">
                        <img src="/static/icons/star.png" alt="">
                    </div>
                </a>  
                </div>`
            }
        }
        
    })
    .catch((error)=>console.log(error))
})