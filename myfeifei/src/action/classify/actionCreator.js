import {fetch} from "whatwg-fetch";

export const getId = (params,index)=>{
    let action = (data)=>({
        type:"GET_ID",
        value:data,
        id:params,
        index:index
    })
    let id = action().id;
    return (dispatch)=>{
        fetch("/api/cmobile/index.php?app=goods_cat&mod=category_23&gc_id="+id)
        .then((res)=>res.json())
        .then((data)=>{
            dispatch(action(data));
        })

    }
}
export const getGoods = ()=>{
    let action = (data)=>({
        type:"GET_GOODS",
        value:data
    })
    return (dispatch)=>{
        fetch("/api/cmobile/index.php?app=goods_cat&mod=category_23&gc_id=41")
        .then(res=>res.json())
        .then((data)=>{
            dispatch(action(data));
        })
    }
}