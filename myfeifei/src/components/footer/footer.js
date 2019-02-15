import React,{ Component } from "react";
import {NavLink} from "react-router-dom";
export default class Footer extends Component{
    constructor(){
        super();
        this.state = {
            footerNavs:[
                {
                    tit:"首页",
                    name:"/home"
                },{
                    tit:"分类",
                    name:"/classify"
                },{
                    tit:"消息",
                    name:"/message"
                },{
                    tit:"购物车",
                    name:"/shoppingCard"
                },{
                    tit:"我的",
                    name:"/my"
                },
            ]
        }
    }
    render(){
        let {footerNavs} = this.state;
        return(
            <ul className="footer">
                {
                    footerNavs.map((item,index)=>{
                        return <li key= {index}>
                            <NavLink to={item.name}>
                            {item.tit}</NavLink>
                        </li>
                    })
                }
            </ul>
        )
        
    }
}