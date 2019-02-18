import React,{Component} from "react";

import  Banner from "./components/banner";
import Class from "./components/class";
import SkinCare from "./components/skinCare";
import Snack from "./components/snacks";
import Winter from "./components/winter";
import "../../../../style/home/home.css";
import {connect} from "react-redux";
import {bannerImg,classImg} from "../../../../action/home/actionCreator";
  class Conter extends Component{
 render(){
     let {bannerList,classList}= this.props; 
    console.log(bannerList);
    console.log(classList);
     return(
         <div id="homeConter">
        <Banner bannerList={bannerList}/>
         <Class classList={classList}/>
         <SkinCare/>
         <Snack/>
          <Winter/>
         </div>
         
     )
 }
 componentDidMount(){
    this.props.handleData();
   this.props.handleClass();
};
};

const mapStateToProps = (state)=>({
   
     bannerList :state.getIn(["Home","bannerList"]),
    classList :state.getIn(["Home","classList"])
})

const mapDispatchToProps=(dispatch)=>({
handleData(){
 
dispatch(bannerImg())
},
handleClass(){
 
    dispatch(classImg())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Conter);