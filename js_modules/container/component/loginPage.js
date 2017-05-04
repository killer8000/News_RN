import React, {Component} from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import {connect, Provider} from 'react-redux'
import {login, logout} from '../../redux/action/loginAction'
import {LOGIN_TYPE} from '../../redux/action/types'
import Dialog from '../common/Dialog'
import Toast from '../common/Toast'
const $ = require('HDimension')
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
        }
    }

    componentDidMount() {
        this.props.getTitleBar().setTitle("登录");
    }

    render() {
        const {navigator, dispatch}=this.props
        return (
            <View style={styles.root}>
                <View style={styles.loginImgContainer}>
                    <Image source={require("../../container/img/login.png")}
                           style={styles.img}/>
                </View>
                <View style={styles.inputContainer}>
                    {/**用户名**/}
                    <TextInput style={styles.textInput} placeholder="user" underlineColorAndroid="transparent"
                               maxLength={16}
                               onChangeText={(value)=> {
                                   this.setState({userName: value});
                               }}></TextInput>
                    {/**分割线**/}
                    <View style={styles.dividingLine}/>
                    {/**密码**/}
                    <TextInput style={styles.textInput} placeholder="password" underlineColorAndroid="transparent"
                               secureTextEntry={true}
                               maxLength={16} onChangeText={(value)=> {
                        this.setState({password: value})
                    }}></TextInput>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor="#a8a8a8"
                                    onPress={
                                        ()=> {
                                            dispatch(login({
                                                    navigator,
                                                    dialog: this.refs['Dialog'],
                                                    toast: this.refs['Toast'],
                                                    type: LOGIN_TYPE.ACCOUNT,
                                                    userName: this.state.userName,
                                                    password: this.state.password,
                                                })
                                            )
                                        }
                                    }>
                    <Text>登录</Text>
                </TouchableHighlight>
                <View style={{
                    flexDirection: "row", justifyContent: 'center',
                    alignItems: 'center', marginTop: 100
                }}>
                    <View style={[styles.dividingLine, {width: $(0.2).width}]}/>
                    <Text> 更多登录方式 </Text>
                    <View style={[styles.dividingLine, {width: $(0.2).width}]}/>
                </View>
                <View style={{
                    flexDirection: 'row', marginLeft: 30, marginRight: 30
                }}>
                    <TouchableHighlight underlayColor="transparent" style={styles.loginOtherContainer}
                                        onPress={()=> {
                                            dispatch(login({
                                                navigator,
                                                dialog: this.refs['Dialog'],
                                                toast: this.refs['Toast'],
                                                type: LOGIN_TYPE.WECHART
                                            }))
                                        }}
                    >
                        <Image source={require("../../container/img/wechart.png")}
                               style={[styles.loginOther,]}/>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={styles.loginOtherContainer}
                                        onPress={()=> {
                                            dispatch(login({
                                                navigator,
                                                dialog: this.refs['Dialog'],
                                                toast: this.refs['Toast'],
                                                type: LOGIN_TYPE.QQ
                                            }))
                                        }}>
                        <Image source={require("../../container/img/qq.png")}
                               style={[styles.loginOther,]}/>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="transparent" style={styles.loginOtherContainer}
                                        onPress={()=> {
                                            dispatch(login({
                                                navigator,
                                                dialog: this.refs['Dialog'],
                                                toast: this.refs['Toast'],
                                                type: LOGIN_TYPE.BLOG
                                            }))
                                        }}
                    >
                        <Image source={require("../../container/img/blog.png")}
                               style={[styles.loginOther,]}/>
                    </TouchableHighlight>
                </View>
                <Dialog ref="Dialog" text="登录中..." textStyle={{color: 'white'}}/>
                <Toast ref='Toast' during={1000} style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',}}
                       textStyle={{color: 'white'}}/>
            </View>
        )
            ;
    }
}

//selector：这是你自己编写的一个函数。这个函数声明了你的组件需要整个 store 中的哪一部分数据作为自己的 props。
// 这个state的含义就是provider里面 初始化store时 的参数 参考loginProvider 里的initialData
function selector(state) {
    return {
        isLogin: state.loginReducer.isLogin,
        user: state.loginReducer.user,
        status: state.loginReducer.status
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(selector)(App) 中；
export default connect(selector)(LoginPage);
const styles = StyleSheet.create(
    {
        root: {
            flex: 1,
            flexDirection: 'column',
        },
        textInput: {
            padding: 5
        },
        button: {
            marginTop: 50,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#a8a8a8',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginLeft: 30,
            marginRight: 30,

        },
        inputContainer: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#a8a8a8',
            marginLeft: 30,
            marginRight: 30
        },
        dividingLine: {
            backgroundColor: '#a8a8a8',
            height: 0.5,
        },
        img: {
            height: 50,
            width: 50
        },
        loginImgContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: $(0.5).width
        },
        loginOther: {
            height: 40,
            width: 40,
        },
        loginOtherContainer: {
            width: $(-60).width / 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
        }
    }
);