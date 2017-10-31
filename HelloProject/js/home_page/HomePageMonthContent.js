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
    TouchableOpacity,
    Navigator,
    Text,
    Dimensions
} from 'react-native';

import MonthPageDays from './MonthPageDays'
class HomePageMonthContent extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    componentDidMount() {
    }

    onMonthChanged() {
        this.refs.MonthPageDays.cancelClassInfoWindowCallBack();
        this.refs.MonthPageDays.setCancelSelectItem();
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <MonthPageDays ref='MonthPageDays' month={this.props.month}
                               year={this.props.year} navigator={this.props.navigator} dataMap={this.props.dataMap}
                               classTag={this.props.classTag}/>
            </View>

        );
    }
}
var screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    mainViewStyle: {
        marginTop: 10
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageMonthContent;

