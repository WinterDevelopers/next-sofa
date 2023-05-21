import cookie from 'cookie';
import nsapi from '../../../fetchurlconfig';

export default async(req,res)=>{
    if (req.method === 'POST'){
        const {username,email, password, password2} = req.body
        const body  = JSON.stringify({email,password,username,password2});
        try{
            const option={
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:body
            }
            const apiRes = await fetch(`${nsapi}company/api/register`,option);
            const data = await apiRes.json()
            console.log(apiRes.status)
            if(apiRes.status === 201){
                return res.status(201).json({success:`account created successfully`});
            }
            else{
                return res.status(apiRes.status).json({failed:`failed to create account`});
            }
        }
        catch(err){
            return res.status(500).json({error:`something went wrong during registering`});
        }
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`Method ${req.method} is not allowed`});
    }
}
