import Immutable from  "immutable";
import { getId } from "../../action/classify/actionCreator";
const defaultState = Immutable.fromJS({
    gc_id:41,
    class_list :[]

})
export default (state=defaultState,action)=>{
    switch(action.type){
        case "GET_ID":
           
            const getIdState = state.setIn(["class_list"],action.value.datas.class_list);
            console.log(getIdState.toJS());
            return getIdState;
        case "GET_GOODS":
            const getGoods = state.setIn(["class_list"],action.value.datas.class_list);
            console.log(getGoods.toJS());
            return getGoods;
    }
    return state;
}