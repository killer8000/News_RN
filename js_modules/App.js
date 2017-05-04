'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';

// import configureStore from './store';
import configureStore from './redux/store/index'

import Index from './index';

let initialDate = {
    loginReducer: {isLogin: false, user: {}, status: null},
    numReducer: 10, textReducer: 'hello world'
}
export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={configureStore(initialDate)}>
                <Index />
            </Provider>
        )
    }
}

