import {combineReducers} from 'redux'
//不能使用 import * as numRedcer from './numReduces'
import numReducer from './numReduces'
import loginReducer from './loginReducers'
import textReducer from './textReducer'
const index = combineReducers({
    numReducer,
    textReducer,
    loginReducer
});
export default index