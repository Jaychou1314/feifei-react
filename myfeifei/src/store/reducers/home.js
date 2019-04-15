import Immutable from  "immutable";
// const defaultState = Immutable.Map({
//         bannerList:Immutable.List([]),
// })
const defaultState = Immutable.fromJS({
    bannerList:[],
    classList:[],
})
export default (state=defaultState,action)=>{
    // 将action 传递过去
    console.log(action);
    switch(action.type){
        case "BANNER_IMG" :
         //let bannerstate = state.updateIn(["bannerList"],(x)=>x.concat(action.value.datas[1]));
         let bannerstate = state.setIn(["bannerList"],action.value.datas[1].data);
        console.log(action.value.datas);
        console.log(bannerstate);
        return bannerstate;

        case "CLASS_IMG" :
        let classstate = state.setIn(["classList"],action.value.datas[4].data);
        console.log(action);
        console.log(classstate);
        return classstate;
    }
    console.log(state);
    return state;
}
