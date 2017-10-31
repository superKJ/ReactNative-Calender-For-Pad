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
    TouchableOpacity
} from 'react-native';
var {NativeModules} = require('react-native');
import {on,trigger,remove} from '../events/calendarMenuPopEvents';
let ClassResourceInterface = NativeModules.ClassResourceInterface;
class HomePagePop extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentItemTag: 0,
        };
    }

    componentDidMount() {
        on("itemClick", ((value)=> {
            this.setState({
                currentItemTag: value,
            });
        }).bind(this));
    }


    homePageItemPopClick(index) {

        if (index == 0) {
            this.props.onPopShowCallBack();
        }
        if (index == 1) {
            NativeModules.ClassResourceInterface.HandleMessage('HomePagePop1');
        }
        if (index == 2) {
            NativeModules.BrilliantUploadInterface.HandleMessage('HomePagePop');
        }
        trigger("itemClick", index);
    }

    componentWillUnMount() {
        remove("itemClick", this.handler);
    }

    render() {
        return (
            <Image source={require('../../img/more_pop_bg.png')} resizeMode={'contain'}
                   style={{width: 166,height: 104,position: 'absolute',top: 0, bottom: 0, left: 0, right: 0, }}>
                {/*
                 <TouchableOpacity style={[styles.homePagePopTvStyle,{backgroundColor: '#f5f6f8',margin:9}]}
                 onPress={() => this.homePageItemPopClick(0)}>
                 <View>
                 <Text style={{color:'#f86c5f'}}>智慧课堂</Text>
                 </View>
                 </TouchableOpacity>

                 */}
                <TouchableOpacity style={[styles.homePagePopTvStyle]}
                                  onPress={() => this.homePageItemPopClick(2)}>
                    <View >
                        <Text style={{color:this.state.currentItemTag==2?'#cc0000':'#000000'}}>花絮上传</Text>
                    </View>
                </TouchableOpacity>

                <View style={{height:1,width:115,marginLeft:25,backgroundColor:'#b1b1b1'}}/>

                <TouchableOpacity style={[styles.homePagePopTvStyle,{marginBottom:12}]}
                                  onPress={() => this.homePageItemPopClick(1)}>
                    <View >
                        <Text style={{color:this.state.currentItemTag==1?'#cc0000':'#000000'}}>课件资源</Text>
                    </View>
                </TouchableOpacity>
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    homePagePopTvStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePagePop;

