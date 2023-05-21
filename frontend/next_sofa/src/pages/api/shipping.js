import nsapi from "../../../fetchurlconfig";
import cookie from 'cookie';

export default async(req,res)=>{
    let res_stat = 101;

    if(req.method === 'POST'){
        const body = JSON.stringify(req.body);
        const url = `${nsapi}store/api/shipping`;
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies._acsx ?? false;
      
        let response = null;
        let option = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:body
        }
        if(access==false){
            response = await fetch(url,option);
            let data = await response.json();
            res_stat = response.status;
            return res.status(res_stat).json({data:data});
        }
        else if(access){
            option.headers = {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${access}`,
            };
            response = await fetch(url,option);
            let data = await response.json();
            res_stat = response.status;
            return res.status(res_stat).json({data});
        }
   
    }
    return res.status(res_stat).json({data:''});
}