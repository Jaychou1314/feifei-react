import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";
import Footer from "./components/footer/footer";


import Home from "./components/home/home";
import Classify from "./components/classify/classify";
import Message from "./components/message/message";
import ShoppingCard from "./components/shoppingCart/shoppingCart";
import My from "./components/my/my";

// import  "./router/home/home";

import "./common/css/reset.css";
import "./common/js/flexble";


class App extends Component {
  render() {
    return (
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
    );
  }
}
export default App;
