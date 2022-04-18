import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
    cartReducer: cartReducer,    // key : value of cartReducer component
})

export default rootReducer;