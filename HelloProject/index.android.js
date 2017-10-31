//require('./Application');

import React, {Component} from 'react';
import {
    AppRegistry,
    } from 'react-native';

//这里不能写var App = require('./src/Application'); 会出现问题
//（小白刚学还不会，有路过的大神可以留言教一下）。
import App from './Application';

export default class Pagejump extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('HelloProject', () => Pagejump);