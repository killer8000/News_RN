/**
 * Created by ndh on 17/1/18.
 */
import React, {Component, DataSource} from 'react';
import {ListView} from 'react-native'
import NetUtil from '../../common/net/NetUtil'
import  Item from './item'
import WebView from './webView'
import RealmManager from '../../common/realm/RealmManager'
import {
    Image,
    Text,
    View,
    Navigator,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {PullList} from 'react-native-pull';
const manager = new RealmManager();
var datas = []
export default class Home extends Component {
    constructor(props) {
        super(props);
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(datas),
            flag: false,
            isRefreshing: false,
            page: 1
        };
    }

    json_array(data) {
        var len = eval(data).length;
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr[i] = []; //js中二维数组必须进行重复的声明，否则会undefind
            arr[i]['top_image'] = data[i].top_image;
            arr[i]['content'] = data[i].content;
            arr[i]['news_id'] = data[i].news_id;
            arr[i]['title'] = data[i].title;
            arr[i]['digest'] = data[i].digest;
            arr[i]['text_imge0'] = data[i].text_image0;
            arr[i]['text_image1'] = data[i].text_image1;
            arr[i]['source'] = data[i].source;
            arr[i]['state'] = '0';
            if (manager.getLenth('News', 'news_id = "' + data[i].news_id + '"') == 0) {//数据库没有数据才能插入
                manager.add('News', {
                        news_id: data[i].news_id,
                        top_image: data[i].top_image,
                        content: data[i].content,
                        title: data[i].title,
                        digest: data[i].digest,
                        text_image0: data[i].text_image0,
                        text_image1: data[i].text_image1,
                        source: data[i].source,
                        state: "0" // 0,1,2 未读，已读，删除
                    }
                )
            } else if (manager.getLenth('News', 'news_id = "' + data[i].news_id + '"') == 1) {
                arr[i]['state'] = manager.sort('News', 'news_id = "' + data[i]['news_id'] + '"', 'title', 0, 1)[0].state;
            }
        }
        return arr;
    }

    _onRefresh() {
        this.setState({isRefreshing: true})
        setTimeout(()=> {
            this.setState({isRefreshing: false})
        }, 1000)
    }

    renderFooter() {
        if (this.state.flag) {
            return null;
        }
        return (
            <View style={{height: 100}}>
                <ActivityIndicator />
            </View>
        );
    }

    onPullRelease(resolve) {
        alert(resolve)
    }

    loadmore() {
        this.setState({page: this.state.page + 1})
        this.getNews()
    }

    _renderFooter() {
        if (false) {
            return null
        }
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Text >loading more...</Text>
                <ActivityIndicator/>
            </View>
        )
    }

    _click() {
        alert(this.refs['ref_item'])
    }

    _renderRow(rowData, sectionID, rowID) {
        let rowState = manager.sort('News', 'news_id = "' + rowData['news_id'] + '"', 'title', 0, 1)[0].state;
        return (
            <Item
                onPress={()=> {
                    if (rowState == 0) {
                        //更改数据库中 该条数据的状态
                        manager.updateState('News', 'news_id = "' + rowData['news_id'] + '"', '1')
                        // 更改页面上该条数据的状态
                        let newData = this.state.dataSource._dataBlob.s1;
                        let _item = Object.assign({}, newData[rowID], {'state': '1'});
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(Object.assign({}, newData, {[rowID]: _item})),
                        })
                    }
                    const {navigator}=this.props;
                    if (navigator) {
                        navigator.push(
                            {
                                name: 'web',
                                component: WebView,
                                sceneConfig: Navigator.SceneConfigs.FadeAndroid,
                                params: {
                                    img0: rowData['text_image0'],
                                    img1: rowData['text_image1'],
                                    content: rowData['content'],
                                    title: rowData['title'],
                                    source: rowData['source'],
                                    digest: rowData['digest']

                                }
                            }
                        );
                    }
                }}
                leftImg={{uri: rowData['top_image']}}
                description={rowData['title']}
                rightImg={require('../../container/img/row_right.png')}
                marginBottom={5}
                descriptionStyle={[{fontSize: 15}, rowData['state'] == '1' ? {color: '#aaaaaa'} : {color: '#000000'}]}
                leftImgStyle={{width: 40, height: 40, marginHorizontal: 10}}
            />
        )
    }

    render() {
        return (
            <View style={{flex: 1, padding: 10}}>


                <ListView
                    ref="list"
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing }
                            onRefresh={ this._onRefresh.bind(this) }
                            tintColor="gray"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="gray"/>
                    }
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReachedThreshold={10}
                    onEndReached={
                        ()=> {
                            this.loadmore()
                        }
                    }
                />
            </View>
        );
    }


    componentDidMount() {
        this.props.getTitleBar().setTitle("新闻");
        // this.props.getTitleBar().setLeftView(<View/>)
        this.getNews();
    }

    getNews() {
        new NetUtil().getNews({tableNum: 1, pagesize: 20, page: this.state.page}, (result)=> {
            this.setState({flag: true})
            // 数组拼接
            datas.push(...this.json_array(result.data))
            this.setState({dataSource: (ds.cloneWithRows(datas))})
        }, (e)=> {
            this.setState({flag: true})
            alert(e.toString())
        })
    }

    componentDidUpdate() {
        if (this.props.navigator.refs)
            this.props.getTitleBar().setTitle("新闻");
    };
}