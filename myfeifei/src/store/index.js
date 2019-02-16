import {createStore,applyMiddleware} from "redux";
import {combineReducers} from "redux-immutable";
import Classify from "./reducers/classify";
import Home from "./reducers/home";
import Message from "./reducers/message";
import My from "./reducers/my";
import ShoppingCart from "./reducers/shoppingCart";
import thunk from "redux-thunk";
const reducers = combineReducers({
    Classify,
    Home,
    Message,
    My,
    ShoppingCart
})
const store = createStore(reducers,applyMiddleware(thunk));
export default store;