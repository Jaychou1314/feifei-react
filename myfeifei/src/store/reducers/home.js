import Immutable from  "immutable";
const defaultState = Immutable.fromJS({

})
export default (state=defaultState,action)=>{
    console.log(state);
    return state;
}