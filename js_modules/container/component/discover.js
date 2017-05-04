/**
 * Created by ndh on 17/1/18.
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
export default class Discover extends Component {
    render() {
        return (
            <Text>发现</Text>
        );
    }

    componentDidMount() {
        this.props.getTitleBar().setTitle("发现");
        // this.props.getTitleBar().setLeftView(<View/>)

    }

    componentDidUpdate() {
        if (this.props.navigator.refs)
            this.props.getTitleBar().setTitle("发现");
    };
}