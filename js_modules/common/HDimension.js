/*
 * @providesModule HDimension
 * 该模块主要为尺寸输出提供方便
 * （react-native尺寸不提供按百分比设置）
 * @DEMO
 * let $ = require('HFDimension');
 * let width2 = $(0.8);  // 在375宽度下输出300
 * let width2 = $(-16);  // 在375宽度下输出359
 * Created by ndh on 17/3/17.
 */

'use strict';

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var SCREEN_HEIGHT = require('Dimensions').get('window').height;
function getWidth(width, scareBase) {
    if (width < 0) {
        return width + SCREEN_WIDTH;
    } else if (width < 1 || width == 1) {
        return width * SCREEN_WIDTH;
    } else if (scareBase) {
        return width / scareBase * SCREEN_WIDTH;
    } else {
        return width;
    }
}
function getHeight(height, scareBase) {
    if (height < 0) {
        return height + SCREEN_HEIGHT;
    } else if (height < 1 || height == 1) {
        return height * SCREEN_HEIGHT;
    } else if (scareBase) {
        return height / scareBase * SCREEN_HEIGHT;
    } else {
        return height;
    }
}
module.exports = (width, height, scareBase) => {
    return {
        width: getWidth(width, scareBase),
        height: getHeight(height, scareBase)
    }

};
