import cookie from 'cookie'
import nsapi from "../../../fetchurlconfig";

export default async(req, res)=>{
    if(req.method === 'POST'){
        
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies._acsx ?? false
        const url = `${nsapi}store/api/user-rate`;
            const body = req.body;
            const options = {
                method:'POST',
                headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${access}`,
                    },
                body:JSON.stringify(body)};
        if(!access){
            return res.status(403).json({error:'something went wrong!!'})
        }
        else{
            
            const apiRes =await fetch(url,options);
            if(apiRes.status === 200){
                const data = await apiRes.json()
                
                return res.status(apiRes.status).json({condition:data})
            }
            else{
                return res.status(apiRes.status).json({error:'An error occurred'})
            } 
        }
        
    }

    else{
        res.setHeaders('Allow',['POST']);
        return res.status('405').json({error:`Method ${req.method} is not allowed`})
    }
}