'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import  index from '../../redux/reducer/index';
import thunk from 'redux-thunk';
const logger = store => next => action => {
    if(typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

let middlewares = [
    logger,
    thunk
];

let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(index, initialState);

    return store;
}