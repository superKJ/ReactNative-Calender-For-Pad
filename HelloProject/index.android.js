//require('./Application');

import React, {Component} from 'react';
import {
    AppRegistry,
    } from 'react-native';

//���ﲻ��дvar App = require('./src/Application'); ���������
//��С�׸�ѧ�����ᣬ��·���Ĵ���������Խ�һ�£���
import App from './Application';

export default class Pagejump extends Component {
    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('HelloProject', () => Pagejump);