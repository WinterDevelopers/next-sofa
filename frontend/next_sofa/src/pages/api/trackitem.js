import nsapi from "../../../fetchurlconfig";

export default async(req,res)=>{
    
    if(req.method==="POST"){
        const tracking_id= req.body;
        const res_ = await fetch(`${nsapi}store/api/track-item/${tracking_id}`);
        if(res_.status == 200){
            const data = await res_.json();
            return res.status(200).json({data})
        }
        else{
            return res.status(404).json({error:`An error occured or item doesn\nt exist`})
        }
    }
    else{
        return res.status(405).json({error:`method: ${req.method} not Allowed`})
    }
}