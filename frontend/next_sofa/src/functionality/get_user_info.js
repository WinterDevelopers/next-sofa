import nsapi from "../../fetchurlconfig";

export default async function getUserData(access){
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

    return apiRes_.status,apiData_
}