import React, {Component} from 'react';
import {
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Navigator,
    DrawerLayoutAndroid,
    NativeModules
} from 'react-native';
import Home from './home'
import Court from './court'
import Discover from './discover'
import Member from './member'
import Show from './show'
// import Search from '../provider/searchProvider'
import Search from '../component/search'
import SliderBar from "./sliderbar"
import TabNavigator from 'react-native-tab-navigator'
import NativeUtils from '../../nativeModuleUtil'
let drawerFlag = true;
export default class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTab: "home"
        }
    }

    componentDidMount() {
        NativeUtils.setStatusBarColor("#2d4486", (msg)=> {
        });
        this.props.getTitleBar().setLeftView(<TouchableOpacity
            onPress={()=> {
                {
                    this.toggleDrawer();
                }
            }}
        >
            <Image source={require('../../container/img/slide.png')}
                   style={[styles.iconStyle, styles.iconLeftMargin]}
            ></Image>
        </TouchableOpacity>)

        this.props.getTitleBar().setRightView(<TouchableOpacity
            onPress={()=> {
                {/*this.props.navigator.push*/
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push(
                            {
                                name: 'serch',
                                component: Search,
                                sceneConfig: Navigator.SceneConfigs.FadeAndroid

                            }
                        );
                    }
                }
            }}
        >
            <Image source={require('../../container/img/search.png')}
                   style={[styles.iconStyle, styles.iconRightMargin]}
            ></Image>
        </TouchableOpacity>)
    }

    toggleDrawer() {
        if (drawerFlag) {
            this.drawer.openDrawer();
        } else {
            this.drawer.closeDrawer()
        }
        drawerFlag = !drawerFlag;
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref={(drawer) => {
                    this.drawer = drawer;
                }}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() =>this.renderSideBar()}
                onDrawerClose={()=>drawerFlag = true}
                onDrawerOpen={()=>drawerFlag = false}
            >

                <TabNavigator tabBarStyle={styles.TabNavigator}>
                    <TabNavigator.Item
                        title="新闻"
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../container/img/ic_tab_home.png")}
                                                 style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../container/img/ic_tab_home_press.png")}
                                                         style={styles.iconStyle}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <Home {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="直播"
                        selected={this.state.selectedTab === 'show'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../container/img/ic_tab_order.png")}
                                                 style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../container/img/ic_tab_order_press.png")}
                                                         style={styles.iconStyle}/>}
                        onPress={() => this.setState({selectedTab: 'show'})}>
                        <Show {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="会员"
                        selected={this.state.selectedTab === 'member'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../container/img/ic_tab_cart.png")}
                                                 style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../container/img/ic_tab_cart_press.png")}
                                                         style={styles.iconStyle}/>}
                        onPress={() => this.setState({selectedTab: 'member'})}>
                        <Member {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="主场"
                        selected={this.state.selectedTab === 'court'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../container/img/ic_tab_home.png")}
                                                 style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../container/img/ic_tab_home_press.png")}
                                                         style={styles.iconStyle}/>}
                        onPress={() => this.setState({selectedTab: 'court'})}>
                        <Court {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="发现"
                        selected={this.state.selectedTab === 'discover'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../container/img/ic_tab_center.png")}
                                                 style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../container/img/ic_tab_center_press.png")}
                                                         style={styles.iconStyle}/>}
                        onPress={() => this.setState({selectedTab: 'discover'})}>
                        <Discover {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </DrawerLayoutAndroid>
        );
    }

    renderSideBar() {
        return (
            <SliderBar  {...this.props}
            />
        );
    }
}


const styles = StyleSheet.create({
    TabNavigator: {
        backgroundColor: '#3b3738'
    },
    iconLeftMargin: {
        marginLeft: 10
    },
    iconRightMargin: {
        marginRight: 10
    },
    iconStyle: {
        width: 26,
        height: 26,
    },
    textStyle: {
        color: '#ffffff',
    },
    selectedTextStyle: {
        color: '#ffffff',
    }
});