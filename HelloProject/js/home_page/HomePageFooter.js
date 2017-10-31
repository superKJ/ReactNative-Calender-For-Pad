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
    DeviceEventEmitter,
    NativeModules
} from 'react-native';

class HomePageHead extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            backgroundColor1: '#ff0000',
            onclick1: true,
            backgroundColor2: '#ffffff',
            onclick2: false,
            tabColor1: '#ffffff',
            tabColor2: '#ff0000',
            hasUploadedBrilliant: true,
        };
    }

    componentDidMount() {

    }

    componentWillMount() {
        DeviceEventEmitter.addListener('brilliantUploadMsg', this.handleAndroidMessage);
    }

    componentWillUnMount() {
        DeviceEventEmitter.remove('brilliantUploadMsg', this.handleAndroidMessage);
    }

    handleAndroidMessage = (msg)=> {
        NativeModules.LoginRNToNativeModule.HandleMessageLog('HomePageFooter onResumeMsg');
        if (msg == '1') {
            this.setState({
                hasUploadedBrilliant: true,
            });
        }
        else {
            this.setState({
                hasUploadedBrilliant: false,
            });
        }
    }

    onchageBackgroud1() {
        if (this.state.onclick1) {

        }
        else {
            this.setState({
                onclick1: !this.state.onclick1,
                onclick2: !this.state.onclick2,
            });
            this.setState({
                backgroundColor1: '#ff0000',
                backgroundColor2: '#ffffff',
                tabColor1: '#ffffff',
                tabColor2: '#ff0000',
            });
        }
        this.props.viewCallBack('Success!');
    }

    onchageBackgroud2() {
        if (this.state.onclick2) {

        }
        else {
            this.setState({
                onclick2: !this.state.onclick2,
                onclick1: !this.state.onclick1,
            });

            this.setState({
                backgroundColor1: '#ffffff',
                backgroundColor2: '#ff0000',
                tabColor1: '#ff0000',
                tabColor2: '#ffffff',
            });

        }

    }

    onBackToToday() {
        this.props.onBackToToday();
    }

    onPopShowCallBack() {
        this.props.onPopShowCallBack();
    }


    render() {
        return (
            <View>
                <View style={{height:1,backgroundColor:'#b4b4b4'}}/>
                <View style={styles.headViewStyle}>
                    <View style={[styles.itemStyle1]}>
                        <TouchableOpacity onPress={this.onBackToToday.bind(this)}
                                          style={{paddingRight:10,paddingTop:10,paddingBottom:10}}>
                            <Text style={[styles.headViewTimeTitleStyle1,{fontWeight:'bold'}]}>今天</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.itemStyle2]}>
                        {
                        }
                    </View>
                    <View style={[styles.itemStyle3]}>
                        <TouchableOpacity onPress={this.onPopShowCallBack.bind(this)}
                                          style={{paddingLeft:10,paddingTop:10,paddingBottom:10}}>
                            <Image source={require('../../img/more.png')} resizeMode={'contain'}
                                   style={styles.menuIconStyle}/>
                        </TouchableOpacity>
                    </View>
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
        height: 50,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headViewTimeTitleStyle1: {
        fontSize: 20,
        marginLeft: 20,
        color: "#ff2f2d",
    },
    headViewTimeTitleStyle2: {
        width: 100,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#660000',
        color: '#ffffff',
    },

    headViewTimeTitleStyle3: {
        width: 100,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#cc3399',
        color: '#ffffff',
    },
    itemStyle1: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    itemStyle2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    itemStyle3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    menuIconStyle: {
        marginRight: 20,
        width: 30,
        height: 20,
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageHead;

