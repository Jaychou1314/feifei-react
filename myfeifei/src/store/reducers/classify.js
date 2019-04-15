import Immutable from  "immutable";
import { getId } from "../../action/classify/actionCreator";
const defaultState = Immutable.fromJS({
    gc_id:41,
    class_list :[],
    activeIndex:0

})
export default (state=defaultState,action)=>{
    switch(action.type){
        case "GET_ID":
           
            let getIdState = state.setIn(["class_list"],action.value.datas.class_list);
            let getIdState1 = getIdState.setIn(["activeIndex"],action.index)
           
            return getIdState1;
        case "GET_GOODS":
            let getGoods = state.setIn(["class_list"],action.value.datas.class_list);
            return getGoods;
    }
    return state;
}