import cookie from 'cookie';
import nsapi from '../../../fetchurlconfig';

export default async(req,res)=>{
    if (req.method === 'POST'){
        const {email, password} = req.body
        const body  = JSON.stringify({email,password});
        try{
            const option={
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:body
            }
            const apiRes = await fetch(`${nsapi}company/api/login`,option);
            const data = await apiRes.json()
            if(apiRes.status === 200){
                res.setHeader('Set-Cookie',[
                    cookie.serialize('_acsx',data.access,{
                        httpOnly: true,
                        //secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 30,
                        sameSite: 'strict',
                        path: '/api/'
                    }),
                    cookie.serialize('_rfhs',data.refresh,{
                        httpOnly: true,
                        //secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24,
                        sameSite: 'strict',
                        path: '/api/'
                    }),
                ])

                return res.status(200).json({success:`logged in successfully`});
            }
            else{
                return res.status(apiRes.status).json({failed:`authentication failed`});
            }
        }
        catch(err){
            return res.status(500).json({error:`something went wrong during authentication`});
        }
    }
    else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({error:`Method ${req.method} is not allowed`});
    }
}
