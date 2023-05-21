import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './cart';
import userStatusReducer from './authState'
//for redux persist 
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig ={
    key:'root',
    version:1,
    storage,
};

const reducer = combineReducers({
    cart:counterReducer,
    userStatus:userStatusReducer,
});

const presistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer:presistedReducer,
    middleware:[thunk],
});

export const persistor = persistStore(store)
