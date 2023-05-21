import { setUserStatus,  } from "@/redux/authState";
import { useDispatch } from "react-redux";

const { removeUserStatus } = require("@/redux/authState");

async function authSet(){
    const dispatch = useDispatch()
    const response =  await fetch('/api/auth')
    const data = await response.json()
    if(response.status != 200){
        const _response = await fetch('/api/refresh')
        if(_response.status != 200){
            console.log('unknow user')
            dispatch(removeUserStatus())
            return
        }
        else if(_response.status == 200){
            console.log('auth user')
            dispatch(setUserStatus(data))
            return
        }
    }
    else if(response.status == 200){
        dispatch(setUserStatus(data))
        return
    }
}
export default authSet