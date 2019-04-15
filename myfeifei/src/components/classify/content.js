import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../style/classify/content.css";
import BScroll from "better-scroll";
class Content extends Component {
    render() {
        let { class_list } = this.props;
       
        return (
            <div className="wrapper" ref="content">
                <div className="content_parent">
                    {
                        class_list.map((item, index) => {
                            return <div className="content" key={new Date().getTime()+item.gc_id}>
                                <h3>{item.gc_name}</h3>
                                <ul>
                                    {
                                        item.third_class.map((item1, index1) => {
                                            return <li key={new Date().getTime()+item1.gc_id}>
                                                <Link to="/goodsList">
                                                    <p><img src={item1.pic} /></p>
                                                    <span>{item1.gc_name}</span>
                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        })

                    }
                </div>
            </div>
        )

    }
    componentDidMount() {
        let wrapper = this.refs.content;
        let scroll = new BScroll(wrapper);
    }
}
const mapStateToProps = (state) => ({
    class_list: state.getIn(["Classify", "class_list"])
})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Content);