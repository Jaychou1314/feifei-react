import React,{Component} from "react";
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
        )
    }
}