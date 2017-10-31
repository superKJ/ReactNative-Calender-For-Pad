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
    Image,
} from 'react-native';
let imgUrl;
class HomePageHead extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isResourceWeek: true,
        };
    }

    componentDidMount() {

    }

    onLastMonth() {
        this.props.onMonthChanged(0);
    }

    onNextMonth() {
        this.props.onMonthChanged(1);
    }

    onClassPopClick() {

        this.props.classPopCallBack();
    }

    onCalendarTitleClick = (data) => {
        this.props.viewCallBack();
    }

    render() {
        if (this.props.tabState == 0) {
            imgUrl = require('../../img/welcome_title_week_down.png');
        }
        else {
            imgUrl = require('../../img/welcome_title_month_down.png');
        }
        return (
            <View style={styles.headViewStyle}>
                <View style={[styles.itemStyle1]}>
                    <TouchableOpacity onPress={this.onLastMonth.bind(this)}
                                      style={{paddingLeft:10,paddingTop:10,paddingBottom:10}}>
                        <Image source={require('../../img/last_month_bg.png')} resizeMode={'contain'}
                               style={{width:20,height:20}}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headViewTimeTitleStyle1]}>{this.props.year}年{this.props.month + 1}月</Text>
                    <TouchableOpacity onPress={this.onNextMonth.bind(this)}
                                      style={{paddingRight:10,paddingTop:10,paddingBottom:10}}>
                        <Image source={require('../../img/next_month_bg.png')} resizeMode={'contain'}
                               onPress={this.onNextMonth.bind(this)} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.itemStyle2]}>

                    <View style={{flexDirection:"row",height:30,width:154}}>
                        <TouchableOpacity style={{   width: 154,height:30,position: 'absolute',
                     top: 0, bottom: 0, left: 0, right: 0,}} onPress={this.onCalendarTitleClick.bind(this)}>
                            <Image
                                source={imgUrl}
                                resizeMode={'contain'} style={{   width: 154,height:30,position: 'absolute',
                     top: 0, bottom: 0, left: 0, right: 0,}}>

                            </Image>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={[styles.itemStyle3]}>
                    <TouchableOpacity
                        style={{alignSelf:'flex-end',marginRight: 20}}>
                        <Text onPress={this.onClassPopClick.bind(this)}
                              style={{ color: "#1b8fff", fontSize: 24,fontWeight:'bold' }}>{this.props.classTag}</Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    },
    headViewStyle: {
        height: 65,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headViewTimeTitleStyle1: {
        fontSize: 24,
        marginLeft: 20,
        color: "#000000",
        marginRight: 20,
    },
    headViewTimeTitleStyle2: {
        flex: 1,
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#660000',
        color: '#ffffff',
    },
    headViewTimeTitleStyle3: {
        flex: 1,
        fontSize: 15,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#cc3399',
        color: '#ffffff',
    },
    itemStyle1: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20,
    },
    itemStyle2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemStyle3: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageHead;

