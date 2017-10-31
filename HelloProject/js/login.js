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
    TextInput,
    TouchableOpacity,
    Text,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';
var {NativeModules} = require('react-native');
let LoginRNToNativeModule = NativeModules.LoginRNToNativeModule;
/**
 * 正式环境url
 * @type {string}
 */
let REQUEST_URL = 'http://rapapi.org/mockjsdata/28216/pad/LoginByUser';

class LoginPage extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            loginResponseData: null,
            userName: '',
            password: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userName')
            .then((value) => {
                if (value !== null) {
                    this.setState({userName: value});
                } else {
                }
            })
            .catch()
            .done();
        AsyncStorage.getItem('passworld')
            .then((value) => {
                if (value !== null) {
                    this.setState({password: value});
                } else {
                }
            })
            .catch()
            .done();
    }

    doLogin() {
        const { navigate } = this.props.navigation;
        navigate('Home');
    }

    render() {

        return (
            <View style={styles.mainViewStyle}>
                <Image source={require('../img/login_bg.jpg')} resizeMode={'contain'} style={styles.bgImage}>
                    <View style={styles.welcome}>

                        <TextInput
                            ref="username"
                            autoCapitalize="none"
                            placeholder="用户名"
                            style={[styles.singleLine,{marginBottom:5}]}
                            placeholderTextColor="#b7b7b7"
                            selectionColor="#cc0000"
                            underlineColorAndroid="#00000000"
                            onChangeText={(text) =>this.setState({userName:text})}
                            value={this.state.userName}
                        />
                        <TextInput
                            ref="passworld"
                            autoCapitalize="none"
                            placeholder="密码"
                            secureTextEntry={true}
                            style={[styles.singleLine]}
                            placeholderTextColor="#b7b7b7"
                            selectionColor="#000000"
                            underlineColorAndroid="#00000000"
                            value={this.state.password}
                            onChangeText={(text) =>this.setState({password:text})}
                        />
                        <TouchableOpacity onPress={this.doLogin.bind(this)}>
                            <Image source={require('../img/login_login_bt.png')} resizeMode={'contain'}
                                   style={styles.loginBgImage}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    },
    bgImage: {
        width: 1080,
        height: 810,
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
    },
    welcome: {
        marginTop: 225,
        marginLeft: 650,
    },
    singleLine: {
        width: 240,
        height: 50,
        fontSize: 16,
        padding: 4,
        color: '#000000',
        marginLeft: 15
    },
    loginBgImage: {
        width: 230,
        marginLeft: 20,
    },
    lostLoginImage: {
        width: 100,
        position: 'absolute',
        top: 180, bottom: 0, left: 165, right: 0,
    },
});


AppRegistry.registerComponent('HelloProject', () => LoginPage);

module.exports = LoginPage;