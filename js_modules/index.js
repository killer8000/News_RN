import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';
import Splash from './container/component/splash'
import Hnavigator from './Hnavigator'
import TabNavigator from 'react-native-tab-navigator';

export default class Assist extends Component {
    initRoute() {
        let route = {};
        route.component = Splash;
        return route;
    }

    render() {
        let flag = false;
        if (flag) {
            return (
                <Navigator
                    initialRoute={{name: "splash", component: Splash}}
                    configureScene={() => {
                        return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        if (route.component) {
                            //这里有个 { ...route.params }
                            return <Component {...route.params} navigator={navigator}/>
                        }
                    }}/>
            );
        }
        else
        {
            let initialRoute = this.initRoute();
            return (
                <Hnavigator initialRoute={initialRoute}/>
            );
        }
    }
}
