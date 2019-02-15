import React ,{Component}from "react";
import {connect} from "react-redux";
import {bannerImg} from "../../../../../action/home/actionCreator";
 class Banner extends Component{
    render(){
        return(
            <div id="banner">
            <ul>
                <li>
                    <img />
                </li>
            </ul>
            </div>
        )
    };
    componentDidMount(){
        // this.props.handleData();
        // console.log(this.props);
    };
 }   
 const mapDispatchToProps=(dispatch)=>({
//handleData(){
   // console.log(dispatch)
  //  dispatch(bannerImg())
//}
 })


export default connect(null,mapDispatchToProps)(Banner)