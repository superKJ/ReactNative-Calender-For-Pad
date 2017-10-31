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


class HomePageMonthHead extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    componentDidMount() {

    }
    render() {
        return (
                <View style={styles.dayLabelsWrapper}>
                    <Text style={styles.dayLabels}>周日</Text>
                    <Text style={styles.dayLabels}>周一</Text>
                    <Text style={styles.dayLabels}>周二</Text>
                    <Text style={styles.dayLabels}>周三</Text>
                    <Text style={styles.dayLabels}>周四</Text>
                    <Text style={styles.dayLabels}>周五</Text>
                    <Text style={styles.dayLabels}>周六</Text>
                </View>

        );
    }
}
var screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({

    dayLabelsWrapper: {
        width:screenWidth,
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        alignSelf: 'center',
        backgroundColor:'#f9f9f9',
        borderColor: 'rgba(0,0,0,0.2)'
    },
    dayLabels: {
        flex:1,
        fontSize: 15,
        color: '#000',
        textAlign: 'center'
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageMonthHead;

