/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component ,PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Navigator,
    Text
} from 'react-native';

import LessonInfoHead from './LessonInfoHead'
class HomePageLessonInfo extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabState: 0,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
        };
    }

    componentDidMount() {
        const { navigator } = this.props;
    }

    viewCallBack = (data) => {
        this.setState({
            tabState: data,
        });
    }

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    setDuration() {
    }

    videoError() {
    }
    loadStart() {
    }
    render() {
        return (
            <View style={styles.mainViewStyle}>
                <LessonInfoHead viewCallBack={this.viewCallBack}
                                navigator={this.props.navigator}/>
                <Video source={"background"} style={styles.backgroundVideo} repeat={false} />

            </View>

        );
    }
}
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    },
    textStyleTitle: {
        fontSize: 24,
        marginLeft: 20,
        marginTop: 40
    },
    textStyleContent: {
        fontSize: 14,
        marginLeft: 20,
    },
    backgroundVideo: {
        position: 'absolute',
        width: 200,
        height: 200,
    },
    backgroundVideo: {
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = HomePageLessonInfo;

