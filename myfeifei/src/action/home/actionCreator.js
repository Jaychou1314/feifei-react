import {fetch} from "whatwg-fetch";

export const bannerImg =()=>{
    let  action =()=>({
        type:"BANNER_IMG",
         
    })
console.log(action);
    return (dispatch)=>{
        console.log(dispatch);
    //     fetch("/api/cmobile/index.php?app=index")
    //     .then(res=>res.json())
    //     .then((data)=>{
    //         console.log(data);
    //          dispatch(action())
    //     })
      }

}