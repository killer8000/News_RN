import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
} from 'react-native';
export default class Hnavigator extends Component {

    _configureScene(route) {
        return route.sceneConfig || {...Navigator.SceneConfigs.FloatFromLeft, gestures: {}};
    }

    _renderScene(route, navigator) {
        return (
            <Page ref="page" route={route} navigator={navigator}/>
        )
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={this.props.initialRoute}
                configureScene={this._configureScene}
                renderScene={this._renderScene}/>
        );
    }
}
class Page extends Component {
    render() {
        return <View style={{flex: 1, backgroundColor: '#00000000'}}>
            <TitleBar ref="titlebar" route={this.props.route} navigator={this.props.navigator}/>
            <this.props.route.component getTitleBar={()=> {
                return this.refs.titlebar
            }} {...this.props.route.params} navigator={this.props.navigator}/>
        </View>
    }
}
class TitleBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "无标题",
            hideTitleBar: false,
            leftView: <View />,
            rightView: <View />,
            titleColor: '#rgb(45,68,134)'
        };
    }


    componentDidMount() {
        this.setLeftView(
            <TouchableOpacity onPress={()=> {
                this.props.navigator.pop()
            }}>
                <Image
                    resizeMode="contain"
                    style={{marginLeft: 10, width: 20, height: 20}}
                    source={require('./container/img/back.png')}
                />
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.hideTitleBar) {
            return <View />
        }
        else {
            return <View style={{backgroundColor: this.state.titleColor, height: 64, flexDirection: 'column'}}>
                <View style={{height: 20}}/>
                <View style={{height: 44, flexDirection: 'row'}}>
                    <View style={{flex: 3, justifyContent: 'center'}}>
                        {this.state.leftView}
                    </View >
                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                        <Text numberOfLines={1} style={{color: 'white', fontSize: 18}}>{this.state.title}</Text>
                    </View>
                    <View style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingRight: 10
                    }}>
                        {this.state.rightView}
                    </View>
                </View>
            </View>
        }
    }

    setTitle(title) {
        this.setState({title: title})
    }

    setRightView(rightView) {
        this.setState({rightView: rightView});
    }

    setLeftView(leftView) {
        this.setState({leftView: leftView});
    }

    hideTitleBar() {
        this.setState({hideTitleBar: true});
    }

    showTitleBar() {
        this.setState({hideTitleBar: false});
    }

    setTitleBarColor(colorStr) {
        this.setState({titleColor: colorStr});
    }

    getHight() {
        return 0;
    }
}