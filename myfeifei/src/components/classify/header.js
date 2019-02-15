import React,{Component} from "react";
export default class header extends Component{
    render(){
        return (
            <div className="header">
                <p>&lt;</p>
                <div>
                    <i>搜索</i>
                    <input type="text"/>
                </div>
                <button>...</button>
            </div>
        )
    }
}