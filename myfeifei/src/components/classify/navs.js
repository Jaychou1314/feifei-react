import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/classify/navs.css";
import { connect } from "react-redux";
import { getId } from "../../action/classify/actionCreator";
class Navs extends Component {
    constructor() {
        super();
        this.state = {
            gc_id: [41, 59, 30, 54, 575, 93, 139, 714, 866, 989],
            select_id: "",
            gc_name:[
                { tit:"美妆个护/宠物" },
                { tit:"服装/服饰/..." },
                { tit:"名鞋/箱包/..." },
                { tit:"零食/茶酒/..." },
                { tit:"家居用品/..." },
                { tit:"母婴/玩具/..." },
                { tit:"电脑办公/..." },
                { tit:"汽车配件/..." },
                { tit:"艺术/礼品/..." },
                { tit:"全球购" }
            ]
        }
    }
    render() {
        let {gc_name} = this.state;
        let {Classify} = this.props;
        let {activeIndex} = Classify.toJS()
        return (
            <div className="navs">
                <ul>
                    {
                        gc_name.map((item,index)=>{
                            return <li key={new Date().getTime()+index} 
                            onClick={this.props.handleClick.bind(this, this.state.gc_id[index],index)}
                            className={activeIndex==index?"active":''}
                            >
                        <span>{item.tit}</span>
                    </li>
                        })
                    }
                    
                    
                </ul>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    gc_id: state.setIn(["Classify", "gc_id"], 10),
    Classify:state.getIn(["Classify"])
})
const mapDispatchToProps = (dispatch) => ({
    handleClick(gc_id,index) {
        dispatch(getId(gc_id,index));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Navs);