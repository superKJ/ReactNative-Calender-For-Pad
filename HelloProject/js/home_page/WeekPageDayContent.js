/**
 * Created by aa on 2016/6/29.
 */
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
    TouchableHighlight,
    Image
} from 'react-native';

//import HomePagePop from './home_page/HomePagePop'
var {NativeModules} = require('react-native');
let ExampleInterface = NativeModules.ExampleInterface;
let imgUrl;
class WeekPageDayContent extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelect: false,
        };

    }

    onWeekDayContentClick = (data) => {
        if (this.props.WeekPageDayContent != null && this.props.WeekPageDayContent.CourseName == '未备课') {
            NativeModules.ToastRNToNativeModule.HandleMessageError("本节课尚未备课，无法打开。");
        }
        else if (this.props.WeekPageDayContent != null && this.props.WeekPageDayContent.CourseName != '未备课') {
            let intentStr = this.props.WeekPageDayContent.TTID + '@' + this.props.WeekPageDayContent.ClassName + '@' + this.props.WeekPageDayContent.PlanDate;
            NativeModules.ExampleInterface.HandleMessage(intentStr);
            this.setState(
                {
                    isSelect: true
                }
            );
            this.props.getOnItemClickCallback(this.props.refTag);
        }
    }

    getOnChangeBackGroud(isSelect) {
        this.setState({
            isSelect: isSelect,
        });

    }

    render() {
        if (this.props.tttype == 1) {
            imgUrl = require('../../img/lian.png');
        }
        else if (this.props.tttype == 2) {
            imgUrl = require('../../img/ce.png');
        }
        else if (this.props.tttype == 0) {
            imgUrl = require('../../img/li.png');
        }
        else {
        }

        //if(this.props.WeekPageDayContent != null && this.props.WeekPageDayContent.CourseName == '未备课'){
        //    imgUrl = imgUrl = require('../../img/kong.png');
        //}
        return (
            <TouchableOpacity onPress={this.onWeekDayContentClick.bind(this)} style={{flex:1}}>

                <View
                    style={[{flex:1},{justifyContent:'center',alignItems :'center',borderColor: '#b2b2b2',borderBottomWidth: 1,borderRightWidth: 1,borderTopWidth:this.props.rowNo==1?1:0}]}>

                    {
                        this.props.WeekPageDayContent == null ? null :
                            <View
                                style={{width:128,flex:1,backgroundColor:this.state.isSelect?'#2da7e6':this.props.bgContentColor}}>
                                <Text
                                    style={{color:this.props.txColor,marginTop:10,marginLeft:10}}>{this.props.WeekPageDayContent.ClassName}</Text>
                                <Text
                                    style={{color:this.props.txColor,marginTop:10,marginLeft:10}}>{this.props.WeekPageDayContent.CourseName}</Text>
                                <Image style={{width:20,height:20,position: 'absolute',top:0,left:100}} source={imgUrl}
                                       resizeMode={'contain'}
                                />
                            </View>
                    }

                </View>

            </TouchableOpacity>
        );
    }

    componentDidMount() {
    }
}
const styles = StyleSheet.create({
    borderColumnViewStyle: {},
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = WeekPageDayContent;

