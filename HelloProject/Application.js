import {
    StackNavigator,
    } from 'react-navigation';

import React from 'react';

import Main from './js/login'
import Home from './js/index.android2'
/*
 * ��ʼ��StackNavigator
 */
export default App = StackNavigator({
    //Ĭ�ϼ��ص�һ��ҳ�棬��������ע����Ҫ��ת��ҳ�� �൱��Manifest.xml�ļ�
    Main: {
        screen: Main,
        navigationOptions: ({navigation,screenProps}) => ({
            header: null, // �����Զ��嵼�������ݣ������Ҫ���ؿ�������Ϊnull
        })
    },
    Home: {
        screen: Home,
        navigationOptions: ({navigation,screenProps}) => ({
            header: null, // �����Զ��嵼�������ݣ������Ҫ���ؿ�������Ϊnull
        })
    }
});