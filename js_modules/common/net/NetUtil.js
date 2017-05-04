/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

class NetUtil extends React.Component {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    get(url, params, sucessCallback, erroCallback) {
        console.info("param=" + params + ",url=" + url);
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        console.info("url=" + url);
        fetch(url, {
            method: 'GET'
        })
            .then((response) =>
                response.text()
            )
            .then((responseText) => {
                sucessCallback(JSON.parse(responseText));
            })
            .catch(e=> {
                erroCallback(e)
            }).done();

    }

    getNews(params , sucessCallback, erroCallback) {
        let url = 'http://api.dagoogle.cn/news/get-news?'
        this.get(url, params, sucessCallback, erroCallback)
    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    post(url, params, headers, callback) {
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'token': headers
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }).done();
    }


}

module.exports = NetUtil;