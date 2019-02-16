import {fetch} from "whatwg-fetch";

//import banner from "../../components/home/components/conter/components/banner";
export const bannerImg =()=>{
  
    let  action =(data)=>({
        type:"BANNER_IMG",
         value:data,
   
    })
 
 
    return (dispatch)=>{
        console.log(dispatch);
        fetch("/api/cmobile/index.php?app=index")
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
             dispatch(action(data));
        })
      }

};


//         《class》
export const classImg =()=>{
  
    let  action =(data)=>({
        type:"CLASS_IMG",
         value:data,
   
    })
 
console.log(action);
    return (dispatch)=>{
        console.log(dispatch);
        fetch("/api/cmobile/index.php?app=index")
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
             dispatch(action(data));
        })
      }

};
