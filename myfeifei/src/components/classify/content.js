import React,{Component} from "react";
import {connect} from "react-redux";
class Content extends Component{
    render (){
        return (
            <div className="content">
              
            </div>
        )
    }

}
const mapStateToProps = (state)=>({
  class_list:state.getIn(["Classify","class_list"])
})
const mapDispatchToProps = (dispatch) =>({
   
})
export default connect(mapStateToProps,mapDispatchToProps)(Content);