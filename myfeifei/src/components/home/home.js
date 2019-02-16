import React,{Component} from "react";
import Header from "./components/header";
import Conter from "./components/conter";
 
import "../../style/home/home.css";
import "../../common/css/iconfont/iconfont.css";
export default class Home extends Component{
    render(){
        return (
            
               <div id="home">
               <Header/>
               <div id="bottom">
               <Conter/>
               </div>
                
               </div>
            
        )
    }
}