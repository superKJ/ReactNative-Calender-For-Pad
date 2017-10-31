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
    ScrollView,
    TouchableHighlight
} from 'react-native';
var {NativeModules} = require('react-native');
class MonthPageDayViewDetail extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {

    }

    getDayViewInfo() {
        let classInfoView = [];
        for (let i = 0; i < this.props.popDataContent.length; i++) {
            let d = this.props.popDataContent[i];
            if ((this.props.classTag == '全部' || this.props.classTag == d.ClassName)) {

            }
            else {
                continue
            }
            let planClass
            if (this.props.popDataContent[i].PlanClassSN > 4) {
                planClass = '下午' + this.props.popDataContent[i].PlanClassSN;
            }
            else {
                planClass = '上午' + this.props.popDataContent[i].PlanClassSN;
            }
            let imgPath;
            if (this.props.popDataContent[i].TTType == 1) {
                imgPath = require('../../img/lian.png');
            }
            else if (this.props.popDataContent[i].TTType == 2) {
                imgPath = require('../../img/ce.png');
            }
            else if (this.props.popDataContent[i].TTType == 0) {
                imgPath = require('../../img/li.png');
            }
            else {
            }
            classInfoView.push(
                <View key={'classInfoView'+i}
                      style={{ marginLeft:10,marginRight:10,borderLeftWidth:1,borderRightWidth:1,borderColor: '#b1b1b1'}}>
                    <View style={{height:1,backgroundColor:'#b1b1b1'}}/>

                    <View
                        style={{height:70,flexDirection: 'row',backgroundColor:'#ffffff'}}>
                        <Text key={"classTypeStr"+i}
                              style={{textAlign:'center',width: 80,marginTop:25,fontSize: 18,color:'#000000'}}>
                            {planClass}
                        </Text>
                        <View style={{width:1,backgroundColor:'#b1b1b1'}}/>
                        <TouchableHighlight key={'TouchableHighlight' + i}
                                            underlayColor="#107db5" onPress={() => this.onMonthDayContentClick(i)}>
                            <View style={{paddingLeft:10,flexDirection: 'column',backgroundColor:'#ffffff',height:70}}>
                                <Text key={"ClassName"+i}
                                      style={{width: 100,marginTop:10,fontSize: 18,color:'#000000'}}>
                                    {this.props.popDataContent[i].ClassName}
                                </Text>
                                <Text key={"ClassContent"+i} style={{width: 130,fontSize: 12,color:'#000000'}}>
                                    {this.props.popDataContent[i].CourseName}
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <Image source={ imgPath} resizeMode={'contain'}
                               style={{width: 20,height:20,position:'absolute',top:0,left:195}}
                        />
                    </View>

                </View>
            );
        }

        return classInfoView;
    }

    cancelClassInfoWindow() {
        this.props.cancelClassInfoWindowCallBack();
    }

    onMonthDayContentClick = (index) => {
        if (this.props.popDataContent[index] != null && this.props.popDataContent[index].CourseName=='未备课') {
            NativeModules.ToastRNToNativeModule.HandleMessageError("本节课尚未备课，无法打开。");
        }
        else if (this.props.popDataContent[index] != null) {
            let intentStr = this.props.popDataContent[index].TTID + '@' + this.props.popDataContent[index].ClassName + '@' + this.props.popDataContent[index].PlanDate;
            NativeModules.ExampleInterface.HandleMessage(intentStr);
        }
        else {
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                <TouchableOpacity onPress={this.cancelClassInfoWindow.bind(this)}>
                    <Text style={{fontSize: 16,color: '#f0142d',margin:10,fontWeight:'bold'}}>
                        取消
                    </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'column',}}>
                    {this.getDayViewInfo()}
                    <View style={{marginLeft:10,marginRight:10,height:1,backgroundColor:'#b1b1b1'}}/>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = MonthPageDayViewDetail;

