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
    Image,
    Animated,
    TouchableHighlight,
    Text,
    Dimensions,
    ScrollView
} from 'react-native';

import HomePageMonthHead from './HomePageMonthHead'
import HomePageMonthContent from './HomePageMonthContent'
class MonthPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    onMonthChanged() {
        this.refs.HomePageMonthContent.onMonthChanged();
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <HomePageMonthHead screenWidth={Dimensions.get('window')}/>
                <ScrollView showsVerticalScrollIndicator={true}
                            contentContainerStyle={styles.contentContainer}>
                    <HomePageMonthContent ref='HomePageMonthContent' selectedDate={this.props.mdate}
                                          year={this.props.myear}
                                          month={this.props.mmonth} navigator={this.props.navigator}
                                          dataMap={this.props.dataMap}
                                          classTag={this.props.classTag}/>

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {},
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = MonthPage;

