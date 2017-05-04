import * as TYPES from '../../redux/action/types'
const initialStatus = {
    isLogin: false,
    user: "张三",
    status: null
}

//create loginReducer
export default function user(state = initialStatus, action)
{
    switch (action.type) {
        case TYPES.DOING_LOGIN:
            return {
                ... state,
                status: TYPES.DOING_LOGIN
            };
        case TYPES.LOGIN_SUCESS:
            return {
                ...state,
                status: TYPES.LOGIN_SUCESS,
                user: action.user,
                isLogin: true
            };
        case TYPES.LOGOUT:
            return {
                ...state,
                status: null,
                user: {},
                isLogin: false
            }
        case TYPES.LOG_ERRO:
            return {
                ...state,
                status: null,
                user: {},
                isLogin: false
            };
        default:
            return state;


    }
}