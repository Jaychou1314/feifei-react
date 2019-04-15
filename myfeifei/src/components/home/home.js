import React,{Component} from "react";
<<<<<<< HEAD
import Header from "../common/header.js";
import "../../style/classify/header.css";
import "./home.css";

import HomeTop from "./homeTop";
export default class Home extends Component{
    render(){
        return (
            <div className="home">
                <Header></Header>
                <HomeTop></HomeTop>
            </div>
=======
import Header from "./components/header";
import Conter from "./components/conter";
 
import "../../style/home/home.css";
import "../../common/css/iconfont/iconfont.css";
export default class Home extends Component{
    render(){
        return (
            
               <div id="home">
               <div>
                <Header id="top"/>
               </div>
              
               <div>
               <Conter id="bottom"/>
               </div>
                
               </div>
            
>>>>>>> de0b21273c6855782c620c337e2d6869baf81ad6
        )
    }
}