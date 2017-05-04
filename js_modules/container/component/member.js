/**
 * Created by ndh on 17/1/18.
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
export default class Member extends Component {
    render() {
        return (
            <Text>会员</Text>
        );
    }

    componentDidMount() {
        this.props.getTitleBar().setTitle("会员");
        // this.props.getTitleBar().setLeftView(<View/>)

    }

    componentDidUpdate() {
        this.props.getTitleBar().setTitle("会员");
    };
}