import {createStore} from "redux";
import {combineReducers} from "redux-immutable";
import Classify from "./reducers/classify";
import Home from "./reducers/home";
import Message from "./reducers/message";
import My from "./reducers/my";
import ShoppingCart from "./reducers/shoppingCart";

const reducers = combineReducers({
    Classify,
    Home,
    Message,
    My,
    ShoppingCart
})
const store = createStore(reducers);
export default store;