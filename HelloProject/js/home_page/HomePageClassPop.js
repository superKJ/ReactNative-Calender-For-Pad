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
    Text,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import {on,trigger,remove} from '../events/classMenuPopEvents';

class HomePageClassPop extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {

    }

    getPopContent() {
        var popContents = [];
        popContents.push(
            <TouchableHighlight underlayColor="rgba(0,140,255,0.5)" key={'c' + i}
                                style={[styles.homePagePopTvStyle,{marginTop:12}]}
                                onPress={() => this._handleItemTouch(-1,0.0,'全部')}>
                <View style={{height: 25,alignItems: 'center'}}>
                    <Text style={{color:'#000000',marginTop:6}}>全部</Text>
                </View>
            </TouchableHighlight>
        );
        for (i = 0; i < this.props.popContent.length; i++) {
            let currentIndex = i;
            let value = this.props.popContent[i].ID;
            let name = this.props.popContent[i].Name;
            popContents.push(
                <TouchableHighlight underlayColor="rgba(0,140,255,0.5)" key={'c' + i}
                                    style={[styles.homePagePopTvStyle,{marginTop:5}]}
                                    onPress={() => this._handleItemTouch(currentIndex,value,name)}>
                    <View style={{flexDirection:'column',height: 35,alignItems: 'center'}}>
                        <View style={{width:240,height:2,backgroundColor:'#b4b4b4'}}/>
                        <Text
                            style={{marginTop:10,color:'#000000'}}>{this.props.popContent[i].Name}</Text>

                    </View>

                </TouchableHighlight>
            );
        }
        return popContents;
    }

    _handleItemTouch(index, classId, name) {
        //给月视图的回调
        trigger("classPopClick", index);
        //给周视图的回调
        this.props.classPopItemCallBack(classId, name);
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <View>
                    <Image source={require('../../img/class_pop_bg.png')} resizeMode={'contain'}
                           style={{width: 154,height: 172,position: 'absolute',top: 0, bottom: 0, left: 0, right: 0, }}>
                        <ScrollView style={styles.verticalScrollView}>
                            {this.getPopContent()}
                        </ScrollView>

                    </Image>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        width: 154,
        height: 172,
        backgroundColor: 'rgba(255,255,255,0)',
        //borderWidth: 1,
        //borderColor: 'rgba(0,0,0,0.2)',
    },
    homePagePopTvStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    verticalScrollView: {},
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageClassPop;

