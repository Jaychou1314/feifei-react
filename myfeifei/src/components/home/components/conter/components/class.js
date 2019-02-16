import React ,{Component}from "react";

export default class Class extends Component{
    render(){
        let {classList} = this.props;
        console.log(classList)
        return(
            <div className="Festival">
                 <ul className="class">
            {
                classList.map((item,index)=>{
                    return  <li key={index}> <img src={item.img}/></li>
                })
            }
            </ul>
            <div className="day"><img src="http://www.feifeis.cn/data/upload/mobile/special/s1550299110/s1550299110_06036431109957901.png"/></div>
            <div className="eat"><img src="http://www.feifeis.cn/data/upload/mobile/special/s1545729613/s1545729613_05990736138725776.png"/></div>
            </div>
           
        )
    }
}