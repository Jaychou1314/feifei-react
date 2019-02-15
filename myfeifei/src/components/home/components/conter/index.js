import React,{Component} from "react";

import  Banner from "./components/banner";
import Class from "./components/class";
import Snack from "./components/snacks";
import Winter from "./components/winter";
import "../../../../style/home/home.css";

export default class Conter extends Component{
 render(){
     return(
         <div id="homeConter">
             <Banner/>
         <Class/>
         <Snack/>
          <Winter/>
         </div>
         
     )
 }
}