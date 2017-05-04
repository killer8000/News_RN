import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import HTMLView from '../htmlview/index'
export default class WebPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }

    componentDidMount() {
        this.props.getTitleBar().setTitle(this.props.title);
    }

    render() {
        return (
            <ScrollView style={{padding:15}}>
                <Text>来源:{this.props.source}</Text>
                <HTMLView value={this.props.content} ></HTMLView>
            </ScrollView>
        );
    }
}
