import * as TYPES from '../../redux/action/types'
const todo = (state = "", action)=> {
    switch (action.type) {
        case TYPES.UPDATE_TEXT:
            // 这样state 应该会从 "" 变成action.text 这样就会导致状态变化，刷新界面，触发render
            return action.text+"a";
        default :
            return state;
    }
};
export default todo