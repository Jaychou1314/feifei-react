import React,{Component} from "react";
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
            
        )
    }
}