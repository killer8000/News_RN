import * as TYPES from '../../redux/action/types'
// 不能使用 export const tod = ....
 const todo=(state=0,action)=>{
switch (action.type){
    case TYPES.ADD:
        return action.num+1;
    case TYPES.DES:
        return action.num-1;
    default:
        return state
}
};
export default todo