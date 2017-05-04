import * as TYPES from './types'

import NetUtil from '../../common/net/NetUtil'
import {LOGIN_TYPE} from './types'
const user1 = {
    userName: '张三',
    age: '23'
}

//账户密码登录
function loginWithAccount(dispatch, opt) {
    let url = "http://wthrcdn.etouch.cn/weather_mini"
    new NetUtil().get(url, {city: "深圳"}, (result=> {
        dispatch({"type": TYPES.LOGIN_SUCESS, user: {name: result.data.city}})

        setTimeout(() => {
            opt.dialog.dismiss()
            opt.navigator.pop()
        }, 2000);

    }), (e=> {
        dispatch({"type": TYPES.LOG_ERRO,})
        opt.dialog.dismiss()
        opt.toast.show('登录失败')
    }))
}
//微信登录
function loginWithWechart(dispatch, opt) {

}
//QQ登录
function loginWithQQ(dispatch, opt) {

}
//微博登录
function loginWithBlog(dispatch, opt) {

}
export const login = (opt)=> {
    return (dispatch) => {
        dispatch({"type": TYPES.DOING_LOGIN})
        opt.dialog.show()
        switch (opt.type) {
            case LOGIN_TYPE.ACCOUNT:
                loginWithAccount(dispatch, opt);
                break;
            case LOGIN_TYPE.WECHART:
                loginWithWechart(dispatch, opt);
                break;
            case LOGIN_TYPE.QQ:
                loginWithQQ(dispatch, opt);
                break;
            case LOGIN_TYPE.BLOG:
                loginWithBlog(dispatch, opt);
                break;
        }

    }

}
export const logout = ()=> {
    return (dispatch)=> {
        dispatch({type: TYPES.LOGOUT})
    }
}

/*
 export const doingLogin=(userName)=>{
 return {
 type:TYPES.DOING_LOGIN,
 userName:userName
 }
 }*/
