/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Navigator,
    DeviceEventEmitter
    } from 'react-native';

import HomePageHead from './home_page/HomePageHead'
import HomePageFooter from './home_page/HomePageFooter'
//import Calendar from '../src/Calendar'
//import LoginPage from '../src/Calendar'
import HomePageMonthContent from './home_page/MonthPage'
//import HomePagePop from './home_page/HomePagePop'
//import HomePageClassPop from './home_page/HomePageClassPop'
import SpringCarousel from './home_page/react-native-infinite-scrollview-master/SpringCarousel'
mdate = new Date();


var REQUEST_URL = 'http://www.tiyuplus.com/pad/GetTimeTable';
var {NativeModules} = require('react-native');
class HomePage extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态，date 月视图显示数据源
        this.state = {
            tabState: 0,
            popState: false,
            popClassState: false,
            date: mdate,
            day: mdate.getDay(),
            month: mdate.getMonth(),
            year: mdate.getFullYear(),
            timeTable: new Map(),
            monthTimeTable: new Map(),
            responseData: null,
            classTag: '全部',
            classTagId: '0.0',
        };
    }

    viewCallBack = (data) => {
        if (this.state.tabState == 0) {
            this.setState({
                tabState: 1,
            });
        }
        else {
            this.setState({
                tabState: 0,
            });
        }
    }
    classPopCallBack = (data) => {
    }
    //切换月回调的方法
    onMonthChange = (data) => {
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <HomePageHead viewCallBack={this.viewCallBack} classPopCallBack={this.classPopCallBack}
                              onMonthChanged={this.onMonthChange} tabState={this.state.tabState}
                              month={this.state.month}
                              year={this.state.year} classTag={this.state.classTag}/>
                {
                    this.state.tabState === 0 ?
                        <SpringCarousel ref='weekPageCalendarView' mdate={this.state.date} mmonth={this.state.month}
                                        myear={this.state.year} mday={this.state.day} dataMap={this.state.timeTable}/> :
                        <HomePageMonthContent ref='HomePageMonthContent' mdate={this.state.date}
                                              mmonth={this.state.month}
                                              myear={this.state.year} navigator={this.props.navigator}
                                              dataMap={this.state.monthTimeTable} classTag={this.state.classTag}/>
                }
                <HomePageFooter viewCallBack={this.viewCallBack}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    popViewStyle: {
        position: 'absolute',
        top: 605, bottom: 0, left: 870, right: 0,
    },
    classPopViewStyle: {
        position: 'absolute',
        top: 60, bottom: 0, left: 860, right: 0,
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePage;