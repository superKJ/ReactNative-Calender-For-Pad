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
    Image
} from 'react-native';

class WeekPageDayTitle extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {

    }

    render() {


        if (this.props.isToday) {
            return (

                <View
                    style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems :'center',backgroundColor:'#f9f9f9'}}>
                    <Image source={require('../../img/red.png')} resizeMode={'contain'} style={{width:20,height:20}}>
                        <Text
                            style={{width:20,color:'#ffffff',marginLeft:2}}>{this.props.mdayTag[this.props.tag] > 9 ? this.props.mdayTag[this.props.tag] : ' ' + this.props.mdayTag[this.props.tag]}</Text>
                    </Image>
                    <Text style={{width:50,color:'#000000'}}>{this.props.titleName}</Text>
                </View>

            );
        }
        else {
            return (
                <View
                    style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems :'center',backgroundColor:'#f9f9f9'}}>
                    <Text
                        style={{width:20,color:'#000000',marginLeft:5}}>{this.props.mdayTag[this.props.tag]}</Text>
                    <Text style={{width:50,color:'#000000'}}>{this.props.titleName}</Text>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    txStyle: {
        color: '#ff5151',
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = WeekPageDayTitle;

