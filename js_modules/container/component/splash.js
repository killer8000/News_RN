import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
    NativeModules
} from 'react-native';
import Main from './main'
import Test from './test'
import NativeUtils from '../../nativeModuleUtil'
var {height, width} = Dimensions.get('window');

export default class splash extends Component {
    render() {
        return (
            <View>
                <Image
                    style={{width: width, height: height}}
                    resizeMode="stretch"
                    source={require('../../container/img/splash.jpg')}/>
            </View>
        );
    }

    componentDidMount() {
        NativeUtils.setStatusBarColor("#a00000", (msg)=> {
        });
        this.props.getTitleBar().hideTitleBar();
        setTimeout(() => {
            this.props.navigator.replace({
                component: Main
            })
        }, 1);
    }
}