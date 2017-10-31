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
    Navigator,
    Text,
    Dimensions,
    TouchableHighlight,
    NativeModules,
    Image
} from 'react-native';

import HomePageLessonInfo from './lesson_info/HomePageLessonInfo';
import NativeMethodsMixin from 'NativeMethodsMixin';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

let itemMax = 4
class MonthPageDatView extends Component {
    classInfoView = [];
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isSelect: false,
        };
    }

    componentDidMount() {
    }

    IntentToLessonInfo() {
        //const { navigator } = this.props;
        //
        //if (navigator) {
        //    navigator.push({
        //        component: HomePageLessonInfo,
        //    })
        //}
        NativeModules.LoginRNToNativeModule.HandleMessageLog('项目个数是' + this.classInfoView.length);
        if (this.classInfoView.length == 0) {
            return;
        }
        NativeMethodsMixin.measure.call(this.refs.hello123, (x, y, width, height, ox, oy) => {
            if (this.props.onClickBle) {
                this.props.onDayClickCallBack(this.props.row, this.props.colume, width, height, ox, oy, this.props.onClickBle, this.props.dataContent, this.props.refStr);
            }

        });


    }

    getClassInfoView() {
        this.classInfoView.length = 0

        if (this.props.day != "") {
            if (this.props.dataContent != null) {
                //console.log("data=" + JSON.stringify(this.props.dataContent))
                for (let i = 0; i < this.props.dataContent.length; i++) {
                    let d = this.props.dataContent[i];
                    let classTypePath;
                    if (d.PlanClassSN > 4) {
                        classTypePath = require('../../img/xia.png');
                    }
                    else {
                        classTypePath = require('../../img/shang.png');
                    }
                    let imgPath;
                    if (d.TTType == 1) {
                        imgPath = require('../../img/lian.png');
                    }
                    else if (d.TTType == 2) {
                        imgPath = require('../../img/ce.png');
                    }
                    else if (d.TTType == 0) {
                        imgPath = require('../../img/li.png');
                    }
                    else {
                    }
                    if (this.props.dataContent.length <= 4) {
                        itemMax = 4;
                    }
                    else if (this.props.dataContent.length > 4) {
                        itemMax = 3;
                    }
                    else {

                    }
                    if ((this.props.classTag == '全部' || this.props.classTag == d.ClassName) && i < itemMax) {
                        this.classInfoView.push(
                            <View
                                key={'classInfoView'+i}
                                style={{ width: 130,height:20,flexDirection: 'row',margin:5,marginLeft:20}}>
                                <Image source={require('../../img/blue_point.png')} resizeMode={'contain'}
                                       style={{width: 5,marginTop:3}}
                                />

                                <Image source={classTypePath} resizeMode={'contain'}
                                       style={{width: 20,height:20,marginTop:0,marginLeft:3}}
                                />
                                <Image source={imgPath} resizeMode={'contain'}
                                       style={{width: 20,height:20,marginTop:0,marginLeft:3}}
                                />
                                <Text key={"ClassName"+i} style={{width: 80,color:'#000000',marginLeft:3}}>
                                    {d.ClassName}
                                </Text>
                            </View>
                        );
                    }
                }
            }

        }


        return this.classInfoView;
    }

    getOnChangeBackGroud(isSelect) {
        this.setState({
            isSelect: isSelect,
        });

    }

    render() {
        if (this.props.dataContent != null) {
        }
        return (
            <TouchableHighlight underlayColor="rgba(34,26,100,0.5)" onPress={this.IntentToLessonInfo.bind(this)}
                                ref="hello123">

                <View style={[styles.dayWrapper,{backgroundColor:this.state.isSelect?'#e6e6e6':'#ffffff'}]}>
                    {
                        this.state.isSelect ?
                            <View
                                style={{backgroundColor:'#cc0000' ,position:'absolute',top:0,left:0,width:4,height:150}}/> : null
                    }
                    {
                        this.props.isToday ?
                            <Image source={require('../../img/red.png')} resizeMode={'contain'}
                                   style={{width:20,height:20,position:'absolute',top:0,left:screenWidth / 7 - 20}}>
                            </Image> : null
                    }

                    <Text style={[styles.dayLabel,{color:this.props.isToday?'#ffffff':'#000000'}]}>
                        {this.props.day < 10 ? ' ' + this.props.day : this.props.day}
                    </Text>
                    {this.getClassInfoView()}
                    {
                        this.classInfoView.length > 0 ? (this.props.dataContent.length > itemMax ?
                            <Text style={{width: 80,margin:5,color:'#000000'}}>
                                还有{this.props.dataContent.length - itemMax}节课
                            </Text> : null) : null
                    }
                </View>
            </TouchableHighlight>
        );
    }
}
var screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    dayWrapper: {
        height: 150,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        width: screenWidth / 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    dayLabel: {
        position: 'absolute',
        top: 2,
        left: screenWidth / 7 - 17,
        fontSize: 11,
        color: '#000',
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = MonthPageDatView;

