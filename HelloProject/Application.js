import {
    StackNavigator,
    } from 'react-navigation';

import React from 'react';

import Main from './js/login'
import Home from './js/index.android2'
/*
 * 初始化StackNavigator
 */
export default App = StackNavigator({
    //默认加载第一个页面，这里用来注册需要跳转的页面 相当于Manifest.xml文件
    Main: {
        screen: Main,
        navigationOptions: ({navigation,screenProps}) => ({
            header: null, // 可以自定义导航条内容，如果需要隐藏可以设置为null
        })
    },
    Home: {
        screen: Home,
        navigationOptions: ({navigation,screenProps}) => ({
            header: null, // 可以自定义导航条内容，如果需要隐藏可以设置为null
        })
    }
});