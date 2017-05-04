import React, {Component} from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import {connect, Provider} from 'react-redux'
import {addNum, desNum, updateText} from '../../redux/action/testAction'
import RealmManager from '../../common/realm/RealmManager'
const manager = new RealmManager();

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 这里的numReducer 是 serachProvider.js 里面初始化参数 store中带过来的
        const {dispatch, numReducer, textReducer} = this.props
        alert(numReducer)
        // alert(textReducer)
        // manager.add('Dog', {name: 'dony', age: 10, birthday: '2017-03-30'})
        return (
            <View style={styles.root}>
                <TouchableHighlight onPress={()=> {
                    dispatch(addNum(numReducer))
                }}>
                    <Text>点我加1</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=> {
                    dispatch(desNum(numReducer))
                }}>
                    <Text>点我减1</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=> {
                    dispatch(updateText(textReducer))
                }}>
                    <Text >改变文本</Text>
                </TouchableHighlight>
            </View>
        );

    }
}
const styles = StyleSheet.create(
    {
        root: {
            flex: 1,
            flexDirection: 'column'
        }
    }
);
//selector：这是你自己编写的一个函数。这个函数声明了你的组件需要整个 store 中的哪一部分数据作为自己的 props。
// 这里的state是reducer  createStore(fn)传入的参数就是reducer
function selector(state) {
    return {
        numReducer: state.numReducer,
        textReducer: state.textReducer
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(selector)(App) 中；
export default connect(selector)(Search);