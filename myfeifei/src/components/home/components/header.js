import React ,{Component}from "react";
import "../../../style/home/home.css";
import "../../../common/css/iconfont/iconfont.css";
export default class Header extends Component{
    render(){
        return(
            <div id="homeHeader">
<input type="text" id="homeInput"/>
<div> <i className="iconfont">&#xe643;</i></div>
            </div>
        )
    }
}