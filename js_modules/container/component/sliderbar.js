/**
 * Created by ndh on 17/1/18.
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Navigator
} from 'react-native';
import  SliderItem from './item'
// import loginPage from '../provider/loginProvider'
import loginPage from '../component/loginPage'
import NetUtil from '../../common/net/NetUtil'
import AMapLocation from 'react-native-amap-location';
import {connect} from 'react-redux';
class SliderBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialPosition: 'unknown',
            city: "深圳",
            weather: '晴',
            temp1: '15℃',
            temp2: '25℃',
            user: '登录'
        }
    }

    _weatherinfo;

    componentDidMount() {
        this.unlisten = AMapLocation.addEventListener((data) => {
            console.info("data:" + data.city);
            let city = data.city;
            if (city && city.indexOf("市") > 0) {
                city = city.split("市")[0];
            }
            this.setState({city});
            let url = "http://wthrcdn.etouch.cn/weather_mini"
            new NetUtil().get(url, {city: this.state.city}, (result)=> {
                this._weatherinfo = result.data;
                console.info("info=" + this._weatherinfo)
                if (this._weatherinfo) {
                    this.setState({city: this._weatherinfo.city});
                    this.setState({weather: this._weatherinfo.forecast[0].type});
                    this.setState({temp1: this._weatherinfo.forecast[0].low.split('低温 ')[1]});
                    this.setState({temp2: this._weatherinfo.forecast[0].high.split('高温 ')[1]});
                }
            }, (e)=> {
                alert(e)
            });
// 停止定位
            AMapLocation.stopLocation();
            this.unlisten = null;
        });
        AMapLocation.startLocation({
            accuracy: 'HighAccuracy',
            killProcess: true,
            needDetail: true, // 显示详细信息
            needMars: false, // 是否需要火星坐标，默认将火星坐标转为地球坐标
            needAddress: true,
            onceLocation: false,
            wifiActiveScan: true,
            mockEnable: false,
            interval: 2000,
            gpsFirst: false,
            httpTimeOut: 30000,
        });

    }

    componentWillUnmount() {
        AMapLocation.stopLocation();
        this.unlisten = null;
    }


    render() {
        let {user}=this.props;
        if (!(typeof (user.name) == 'string') || user.name == null || user.name == '') {
            user.name = '未登录'
        }
        return (
            <View style={styles.root}>

                <View style={[styles.center, styles.loginContainer]}>
                    <TouchableOpacity style={styles.center} onPress={()=> {
                        const {navigator}=this.props;
                        if (navigator) {
                            navigator.push(
                                {
                                    name: 'login',
                                    component: loginPage,
                                    sceneConfig: Navigator.SceneConfigs.FadeAndroid
                                }
                            );
                        }
                    }}>
                        <Image
                            resizeMode='contain'
                            style={[{height: 50, width: 50}]}
                            source={require('../../container/img/login.png')}
                        >
                        </Image>
                        <Text style={{justifyContent: 'center', alignItems: 'center',}}>{user.name}</Text>
                    </TouchableOpacity>
                    <Text >{this.state.city} {this.state.weather} {this.state.temp1}~{this.state.temp2}</Text>
                </View>


                < View style={[{flex: 3, backgroundColor: '#8a8a8a'}]}
                >
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的预约"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={1}
                        marginTop={1}
                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的消息"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={1}
                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="关注球队"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={10}

                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的主页"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={10}

                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的会员"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={1}

                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的竞猜"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={1}

                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="我的红包"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={10}

                    />
                    <SliderItem
                        onPress={()=> {
                            alert('click')
                        }}
                        leftImg={require('../../container/img/crown.png')}
                        description="设置"
                        rightImg={require('../../container/img/row_right.png')}
                        marginBottom={1}

                    />

                </View>
            </View>

        );
    }
}

export const styles = StyleSheet.create(
    {
        center: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        root: {
            flexDirection: 'column',
            flex: 1
        },
        loginContainer: {
            flexDirection: 'column',
            flex: 1,
        }
    }
);
function selector(store) {
    return {
        isLogin: store.loginReducer.isLogin,
        user: store.loginReducer.user,
        status: store.loginReducer.status
    }
}
export default connect(selector)(SliderBar);
