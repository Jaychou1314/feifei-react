// 头部搜索框,import 引入，使用：<Header com="home" icon="home"/>

import React,{Component} from "react";
// import "../../common/css/iconfont/iconfont.css";
import RightNav from "../classify/rightNav";
import "../../style/classify/header.css";
class header extends Component{
    constructor(){
        super();
        this.state = {
            flag:false
        }
    }
    render(){
        let {icon,com} = this.props;
        let {flag} = this.state;
        return (
            <div className="header">
                
                {icon?<i className="iconfont">&#xe6bc;</i>:""}
                
                <div>
                    {com=="home"?"":<i className="iconfont" >&#xe643;</i>}
                    <input type="text" placeholder="搜索商品"/>
                </div>
                {com=="home"?<i className="iconfont colorWhite">&#xe643;</i>:<i 
                className="iconfont" onClick = {this.showRightNav.bind(this)}>
                &#xe637;
                {flag==true?<RightNav/>:""}
                </i>}
            </div>
        )
    }
    showRightNav(e){
        e.stopPropagation();
        let flag1 = !this.state.flag;
        this.setState({
            flag:flag1
        })
        console.log(this.state.flag);
    }
}
header.defaultProps = {
    icon:"",
    // 组件名字
    com:"home"
}
export default header;