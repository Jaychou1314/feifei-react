import React, { Component } from "react";
import "../../style/classify/rightNav.css";
import { Link } from "react-router-dom";
export default class RightNav extends Component {
    render() {
        return (
            <div className="rightNav">
                <span>尖角</span>
                <ul>
                    <li>
                        <i className="iconfont">&#xe603;</i>
                        <Link to="/home"><span>首页</span></Link>
                    </li>
                    <li>
                        <i className="iconfont">&#xe607;</i>
                        <Link to="/shoppingCard"><span>购物车</span></Link>
                    </li>
                    <li>
                        <i className="iconfont">&#xe658;</i>
                        <Link to="/my"><span>我的商城</span></Link>
                    </li>
                    <li>
                        <i className="iconfont">&#xe642;</i>
                        <Link to="/message"><span>消息</span></Link>
                    </li>
                </ul>
            </div>
        )
    }
}