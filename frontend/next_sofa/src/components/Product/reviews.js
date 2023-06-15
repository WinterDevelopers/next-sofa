export default function Reviews(props){
    let stars_list = []
    for(let a=0; a< props.rating; a++){
        stars_list.push('*')
    }
   return( <div class="review-container">
   <div>
       <div>
           <h6>{props.name}</h6>
           <div>
                {stars_list.map(x=>{
                    return(<img src="../assets/icons/star.png" className="review-container-star"></img>)
                })}
           </div>
       </div>
       <time>{props.date}</time>
   </div>
   <div class="review-container-body">
       {props.comment}
   </div>
   </div>)
}