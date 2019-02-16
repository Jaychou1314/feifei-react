import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../style/classify/navs.css";
import { connect } from "react-redux";
import {getId} from "../../action/classify/actionCreator";
class Navs extends Component {
    constructor() {
        super();
        this.state = {
            gc_id: [41,59,30,54,575,93,139,714,866,989],
            select_id:""
        }
    }
    render() {
        return (
            <div className="navs">
                <ul>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[0])}>
                        美妆个护/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[1])}>
                        服装/服饰/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[2])}>
                        名鞋/箱包/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[3])}>
                        零食/茶酒/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[4])}>
                        家居用品/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[5])}>
                        母婴/玩具/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[6])}>
                        电脑办公/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[7])}>
                        汽车配件/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[8])}>
                        艺术/礼品/...
                    </li>
                    <li onClick={this.props.handleClick.bind(this, this.state.gc_id[9])}>
                        全球购/...
                    </li>
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => ({
    gc_id:state.setIn(["Classify","gc_id"],10)
})
const mapDispatchToProps = (dispatch) => ({
    handleClick(gc_id){
        dispatch(getId(gc_id));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Navs);