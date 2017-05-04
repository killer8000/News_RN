/**
 * Created by ndh on 17/1/18.
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
export default class Court extends Component {
     render() {
        return (
            <Text>主场</Text>
        );
    }

    componentDidMount() {
        this.props.getTitleBar().setTitle("主场");
        // this.props.getTitleBar().setLeftView(<View/>)

    }

    componentDidUpdate() {
        if (this.props.navigator.refs)
            this.props.getTitleBar().setTitle("主场");
    };
}