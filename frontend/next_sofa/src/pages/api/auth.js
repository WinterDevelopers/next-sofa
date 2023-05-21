import nsapi from "../../../fetchurlconfig";
import cookie from 'cookie'

export default async(req,res)=>{
    if(req.method==='GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies._acsx ?? false;

        if(access === false){
            return res.status(403).json({error:'Not Authorizated to make this request'});
        };

        const body = JSON.stringify({
            token:access
        });
        try{
            const url = `${nsapi}company/api/auth`;
            const option = {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:body,
            };
            const apiRes = await fetch(url,option);
            if (apiRes.status === 200) {
                
                const url_ = `${nsapi}company/api/user-details`;
                const option_ = {
                    method:'GET',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application',
                        'Authorization': `Bearer ${access}`,
                        },
                    }
                const apiRes_= await fetch(url_,option_);
                const apiData_ = await apiRes_.json();

                return res.status(apiRes_.status).json(apiData_);

            } else {
                return res.status(apiRes.status).json({
                    error: 'Failed to authenticate'
                });
            }

        }catch(err){
            return res.status(500).json({
                error: 'Something went wrong when trying to authenticate'+err
            });
        };
    }
    else{
        res.setHeader('Allow',['GET']);
        return res.status(405).json({error:`methos ${req.method} not allowed`});
    };
};