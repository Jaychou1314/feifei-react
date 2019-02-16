import React, { Component } from "react";
import { connect } from "react-redux";
import swiper from "swiper";
import "../../../../../style/home/home.css";
import "../../../../../common/css/iconfont/iconfont/iconfont.css";
class Banner extends Component {
    render() {
        let { bannerList } = this.props;
        console.log(JSON.stringify(bannerList));
        return (
            <div id="banner">
             <div  className="swiper-container ref='banner'">
                <ul className="swiper-wrapper">
                    {
                        bannerList.map((item, index) => {
                            return <li key={index} className="swiper-slide ">
                                <img src={item.img}/> 
                                 {/*<img src="[1].data+'item.img'"/>*/}
                            </li>

                        })
                    }
                </ul>
                </div>
<div id="notice">
    
        <i className="iconfont" id="icon">&#58898;</i>
    
    <p>元宵即将来临，提前祝大家元宵节快乐！</p>
</div>
           
  </div>
           
        )

    };
    componentDidMount() {
        setInterval(() => {
            new swiper('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay: {
                    stopOnLastSlide: true,
                    delay: 3000
                },
            })
        }, 3000)
    }
}

export default connect(null, null)(Banner)


 