export  async function rateProductFunc (){
    let review_text = document.querySelector('[name=review')
    let product_id = document.querySelector('#product-id').dataset.productId
    let rating = document.querySelectorAll('[name=rate]');
    for(let i = 0; i < rating.length; i++){
      if(rating[i].checked){
        let rated = rating[i].dataset.rating;
        let review = review_text.value;

        const url = '/api/rating';
        const body = JSON.stringify({'rating':rated, "review":review, 'id':product_id});
        const headers = {
          method:'POST',
          header:{'Accept':'application/json',
                  'Content-Type':'application/json',},
          body:body
        };
        const promise = await fetch(url, headers);
        if(promise.status === 200 || promise.status === 201){
          const data = await promise.json()
          console.log(data)
        }
        else{
          console.log('an error occured')
        }
      };
    };
}