import React, {Component} from 'react';
import {
    NativeModules
} from 'react-native';
var NativeUtils = {}
NativeUtils.setStatusBarColor = function (colorStr, callBack) {
    NativeModules.TitleBarModule.setTitleColor(colorStr, callBack);
}
export default NativeUtils