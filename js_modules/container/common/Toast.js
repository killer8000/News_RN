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

export default class Toast extends Component {

    constructor(props) {
        super(props)
        this.state = {
            oc: new Animated.Value(0),
            tips: ''
        }
    }

    componentDidMount() {

    }

    show(tips) {
        this.setState({tips});
        this._up()
    }

    _up() {
        flag = false;
        Animated.timing(this.state.oc, {
            toValue: 1, // 目标值
            duration: 500, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start((evt)=> {
            if (evt.finished) {
                setTimeout(() => {
                    this._down();
                }, 2000);
            }
        });
    }

    _down() {
        flag = true;
        Animated.timing(this.state.oc, {
            toValue: 0, // 目标值
            duration: 500, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.parent, {
                opacity: this.state.oc, // Binds directly
                transform: [{
                    translateY: this.state.oc.interpolate({
                        inputRange: [0, 1],
                        outputRange: [$(1, 0.05).height, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                    }),
                }],
            },]}>
                <View style={[styles.container, this.props.style]}>
                    <Text style={[styles.view,this.props.textStyle]}>
                        {this.state.tips}
                    </Text>
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    parent: {
        width: $(1).width,
        position: 'absolute',
        bottom: 0,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: $(1, 0.05).height,
        marginHorizontal: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',

    },
    view: {
        fontSize: 15,
        color:'black'
    }
});