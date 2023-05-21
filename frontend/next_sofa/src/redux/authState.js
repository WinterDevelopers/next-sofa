import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userAuthState:false,
    name:null,
    email:null,
    address:null,
    city:null,
    state:null,
}

const userStatusSlice = createSlice({
    name:'userStatus',
    initialState,
    reducers:{
        setUserStatus:(state, action)=>{
            state.userAuthState=true;
            state.name= action.payload.username;
            state.email= action.payload.email;
            state.address = action.payload.address;
            state.city = action.payload.city;
            state.state = action.payload.state;
        },

        removeUserStatus:(state)=>{
            state.userAuthState=false;
            state.name= null;
            state.email= null;
            state.address = null;
            state.city = null;
            state.state = null;
        }
    }
})

export const {setUserStatus, removeUserStatus} = userStatusSlice.actions;
export default userStatusSlice.reducer;