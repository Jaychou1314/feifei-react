import React,{Component} from "react";
import Header from "../common/header";
import "../../style/classify/header.css";
import {connect} from "react-redux";
import Content  from  "./content";
import Navs from  "./navs";

import {getGoods} from "../../action/classify/actionCreator";
class Classify extends Component{
    render(){
        return (
            <div className="classify">
                <Header com="classify" icon="classify"/>
                <Navs/>
                <Content/>
            </div>
        )
    }
    componentDidMount(){
        this.props.getGoods();
    }
}
const mapDispatchToProps = (dispatch)=>({
    getGoods(){
        dispatch(getGoods());
    }
})
export default connect(null,mapDispatchToProps)(Classify);