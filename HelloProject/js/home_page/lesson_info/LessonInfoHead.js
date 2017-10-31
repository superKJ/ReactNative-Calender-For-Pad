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


class LessonInfoHead extends Component {
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
        };
    }

    componentDidMount() {

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
        this.props.viewCallBack(0);
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
        this.props.viewCallBack(1);
    }


    onExitPage() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:了
            navigator.pop();
        }
    }


    render() {
        return (
            <View style={styles.headViewStyle}>
                <View style={[styles.itemStyle1]}>

                </View>
                <View style={[styles.itemStyle2]}>
                    <Text
                        style={[styles.headViewTimeTitleStyle2, { backgroundColor: this.state.backgroundColor1,color:this.state.tabColor1 }]}
                        onPress={this.onchageBackgroud1.bind(this)}>课程内容</Text>
                    <Text
                        style={[styles.headViewTimeTitleStyle3, { backgroundColor: this.state.backgroundColor2,color:this.state.tabColor2 }]}
                        onPress={this.onchageBackgroud2.bind(this)}>具体动作</Text>
                </View>
                <View style={[styles.itemStyle3]}>
                    <TouchableOpacity onPress={this.onExitPage.bind(this)}>
                        <Text style={[styles.headViewTimeTitleStyle1]}>关闭</Text>
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
        height: 80,
        backgroundColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headViewTimeTitleStyle1: {
        fontSize: 24,
        marginLeft: 20,
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
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = LessonInfoHead;

