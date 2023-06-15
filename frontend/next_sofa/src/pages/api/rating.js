import { Fragment } from "react";
import cookie from 'cookie'
import nsapi from "../../../fetchurlconfig";

export default async(req, res)=>{
    if(req.method === 'POST'){
        const url = `${nsapi}/store/api/rate-product`;
        const body = req.body;
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies._acsx ?? false
       
        const headers = {
            method:'POST',
            headers:{'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${access}`},
            body:body};
        
        if(!access){
            
            return res.status(403).json({error:'something went wrong!!'})
        }
        else{
            
            const apiRes =await fetch(url,headers);
            if(apiRes.status === 200 || apiRes.status === 201){
                const data = await apiRes.json()
                return res.status(apiRes.status).json(data)
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