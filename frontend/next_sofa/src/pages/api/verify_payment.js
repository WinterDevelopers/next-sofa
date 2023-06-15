import cookie from 'cookie'
import nsapi from "../../../fetchurlconfig";

export default async(req, res)=>{
    if(req.method === 'POST'){
        
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies._acsx ?? false

        const body = req.body;

        const url = `${nsapi}store/api/verify-payment/${body['ref']}`;
        

        if(!access){
            const options = {
                method:'GET',
                headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    },
            }
            const apiRes =await fetch(url,options);
            if(apiRes.status === 202 || apiRes.status === 201){
                const data = await apiRes.json()
                
                return res.status(apiRes.status).json({id:data})
            }
            else{
                return res.status(apiRes.status).json({error:'An error occurred'})
            } 
        }

        else if(access){
            const options = {
                method:'GET',
                headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${access}`,
                    },
            }

            const apiRes =await fetch(url,options);
            
            if(apiRes.status === 202 || apiRes.status === 201){
                const data = await apiRes.json()
                console.log(data)
                return res.status(apiRes.status).json({id:data})
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