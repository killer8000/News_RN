import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Easing,
    ActivityIndicator,
} from 'react-native';
const $ = require('HDimension')
export default class Dialog extends Component {
    show() {
        this.refs['Dialog']._up();
    }
    dismiss(){
        this.refs['Dialog']._down();
    }
    render() {
        return (
            <CityDataView ref="Dialog" textStyle={this.props.textStyle} text={this.props.text}/>
        );
    }
}

class CityDataView extends Component {


    constructor(props) {
        super(props)
        this.state = {
            oc: new Animated.Value(0),
            oc1: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._down()
    }

    _down() {
        flag = true;
        Animated.timing(this.state.oc, {
            toValue: 0, // 目标值
            duration: 10, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start((evt)=> {
            if (evt.finished) {
                this._down1();
            }
        });
    }

    _down1() {
        Animated.timing(this.state.oc1, {
            toValue: 0, // 目标值
            duration: 10, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }

    _up() {
        this._up1();
        flag = false;
        Animated.timing(this.state.oc, {
            toValue: 1, // 目标值
            duration: 150, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }

    _up1() {
        Animated.timing(this.state.oc1, {
            toValue: 1, // 目标值
            duration: 10, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }

    /**
     * 控制component的显示与影藏
     */
    toggle() {
        if (flag) {
            this._up();
        } else {
            this._down();
        }
    }

    render() {
        return (
            <Animated.View style={[styles.parent, {
                opacity: this.state.oc, // Binds directly
                transform: [{
                    translateY: this.state.oc.interpolate({
                        inputRange: [0, 1],
                        outputRange: [$(0,1).height, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                    }),
                }],
            }]}>

                <View style={styles.container}>
                    <View style={styles.dialog}>
                        <ActivityIndicator color="#8a8a8a" size="large"/>
                        <Text style={this.props.textStyle}>{this.props.text}</Text>
                    </View>

                </View>
            </Animated.View>

        );
    }

}

const styles = StyleSheet.create({
    parent: {
        /*  position: 'absolute',
         top: -124,//TODO 需要根据标题栏设置
         width: 100,
         height: 100,
         backgroundColor: 'rgba(52,52,52,0.5)',
         justifyContent: 'flex-end',*/
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: -124,
        width: $(1).width,
        height: $(0, 1).height + 124,
        alignItems: 'center'
    },
    container: {
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    dialog: {
        flexDirection: 'column',
        marginBottom: 20,
        marginTop: 20,
        width: $(0.3).width,
        height: $(0.3).width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});
