import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../common/css/iconfont/iconfont.css";
import "./footer.css";
export default class Footer extends Component {
    constructor() {
        super();
        this.state = {
            footerNavs: [
                {
                    tit: "首页",
                    name: "/home",
                    icon: "&#xe653;"
                }, {
                    tit: "分类",
                    name: "/classify",
                    icon: "&#xe7f8;"
                }, {
                    tit: "消息",
                    name: "/message",
                    icon: "&#xe642;"
                }, {
                    tit: "购物车",
                    name: "/shoppingCard",
                    icon: "&#x344b;"
                }, {
                    tit: "我的",
                    name: "/my",
                    icon: "&#xe61a;"
                },
            ],
            token:""
        }
    }
    render() {
        let { footerNavs } = this.state;
        return (
            <ul className="footer">
                <li>
                    <NavLink to="/home">
                        <i className="iconfont">&#xe653;</i>
                        <span>首页</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/classify">
                        <i className="iconfont">&#xe7f8;</i>
                        <span>分类</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/message">
                        <i className="iconfont">&#xe642;</i>
                        <span>消息</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/shoppingCard">
                        <i className="iconfont">&#x344b;</i>
                        <span>购物车</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to={this.state.token?"/my":"/login"}>
                        <i className="iconfont">&#xe61a;</i>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        )

    }
    componentDidMount(){
        this.setState({
            token:localStorage.getItem("token")
        })
    }
}