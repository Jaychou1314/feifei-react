import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Footer from "./components/footer/footer";


import Home from "./components/home/home";
import Classify from "./components/classify/classify";
import Message from "./components/message/message";
import ShoppingCard from "./components/shoppingCart/shoppingCart";
import My from "./components/my/my";
import GoodsList from "./components/classify/goodsList";
import Login from "./components/my/login";
// import  "./router/home/home";

import "./common/css/reset.css";
import "./common/js/flexble";
<<<<<<< HEAD

import { Provider } from "react-redux";
=======
import "../node_modules/swiper/dist/css/swiper.min.css"
//import {Provider} from "react-redux";
>>>>>>> zj
import store from "./store";
class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/classify" component={Classify}></Route>
              <Route path="/message" component={Message}></Route>
              <Route path="/shoppingCard" component={ShoppingCard}></Route>
              <Route path="/goodsList" component={GoodsList}></Route>
              
              <Route path="/my" component={My}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>

=======
      //<Provider store={store}>
        <Router>
        <div className="App">
          
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/classify" component={Classify}></Route>
            <Route path="/message" component={Message}></Route>
            <Route path="/shoppingCard" component={ShoppingCard}></Route>
            <Route path="/my" component={My}></Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
     // </Provider>
      
>>>>>>> zj
    );
  }
}
export default App;
