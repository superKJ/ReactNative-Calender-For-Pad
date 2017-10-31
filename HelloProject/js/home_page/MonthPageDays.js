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
    Dimensions,
    ScrollView
} from 'react-native';
import Day from './MonthPageDatView'
import DMonthPageDayViewDetailay from './MonthPageDayViewDetail'
import NativeMethodsMixin from 'NativeMethodsMixin';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var {
    WEEKDAYS,
    MONTHS,
    MAX_ROWS,
    MAX_COLUMNS,
    getDaysInMonth
    } = require('../Utils/Util');
let dialogWindowW = 240;
let dialogWindowH = 0;
import {on,trigger,remove} from '../events/classMenuPopEvents';
class MonthPageDays extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            popLeft: 0,
            popTop: 0,
            isDialogWindowShow: false,
            popDataContent: null,
            selectedRefTag: null,
            detailPopHeight: 0
        };
    }

    componentDidMount() {
        on("classPopClick", ((value)=> {
            this.cancelClassInfoWindowCallBack();
        }).bind(this));
    }

    componentWillUnMount() {
        remove("classPopClick", this.handler);
    }

    onDayClickCallBack = (dataRow, dateColume, width, height, ox, oy, onClickBle, dataContent, refStr) => {
        if (!onClickBle) {
            return;
        }
        //计算弹出框高度
        let itemCount = 0;
        for (let i = 0; i < dataContent.length; i++) {
            if ((this.props.classTag == '全部' || this.props.classTag == dataContent[i].ClassName)) {
                itemCount++;
            }
        }
        this.setState({
            detailPopHeight: 80 * itemCount + 40
        })
        dialogWindowH = 80 * itemCount + 40;
        var left;
        var top;
        if (dateColume < 4) {
            left = width * dateColume + width;
            top = height * dataRow;
        }
        else {
            left = width * dateColume - dialogWindowW;
            top = height * dataRow;
        }
        if (oy > screenHeight / 2) {
            top = top - dialogWindowH + height;
        }
        else {
        }
        this.setState({
            popLeft: left,
            popTop: top,
            isDialogWindowShow: true,
            popDataContent: dataContent,
        });
        if (this.state.selectedRefTag != null & this.refs[this.state.selectedRefTag] != null) {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(false);
        }
        this.setState({
            selectedRefTag: refStr
        }, function () {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(true);
        });
    }

    getClassContentData(currentDay, dataMap) {
        let mapKey = this.props.year + "-" + (this.props.month + 1) + "-" + currentDay;
        let data;
        if (dataMap[mapKey] != null) {

            data = dataMap[mapKey];
        }
        return data;
    }

    cancelClassInfoWindowCallBack = (data) => {
        this.setState({
            isDialogWindowShow: false,
        });
        this.setCancelSelectItem();
    }

    // 取消之前item的选中状态
    setCancelSelectItem() {
        if (this.state.selectedRefTag != null && this.refs[this.state.selectedRefTag] != null) {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(false);
        }
    }

    getCalendarDays() {

        var columns,
            matrix = [],
            i,
            j,
            month = this.props.month,
            year = this.props.year,
            currentDay = 0,
            thisMonthFirstDay = this.props.startFromMonday ? new Date(year, month, 0) : new Date(year, month, 1),
            slotsAccumulator = 0;
        let MAX_ROWS = 5
        if (thisMonthFirstDay.getDay() > 5) {
            MAX_ROWS = 6;
        }

        for (i = 0; i < MAX_ROWS; i++) { // Week rows
            columns = [];
            for (j = 0; j < MAX_COLUMNS; j++) { // Day columns
                if (slotsAccumulator >= thisMonthFirstDay.getDay()) {
                    if (currentDay < getDaysInMonth(month, year)) {
                        let dataContent = this.getClassContentData(currentDay + 1, this.props.dataMap);
                        let onClickBle = dataContent == null ? false : true;
                        let refStr = year + ":" + (month + 1) + ":" + (currentDay + 1);
                        // 做今天的处理
                        let today = new Date();
                        let todayYear = today.getFullYear()
                        let todayMonth = today.getMonth()
                        let todayDay = today.getDate()
                        let isToday = false;
                        // 如果今天是1号，保证两边都是比如1号的情况下只有本月的1号有红色标识
                        if (this.props.year == todayYear && this.props.month == todayMonth && (currentDay + 1) == todayDay) {
                            isToday = true
                        }
                        else {
                            isToday = false
                        }
                        var dayView = <Day
                            ref={refStr}
                            onDayClickCallBack={this.onDayClickCallBack}
                            key={j}
                            row={i}
                            colume={j}
                            day={currentDay+1}
                            navigator={this.props.navigator}
                            onClickBle={onClickBle}
                            myear={this.props.year}
                            mMonth={this.props.month}
                            dataMap={this.props.dataMap}
                            dataContent={dataContent}
                            classTag={this.props.classTag}
                            refStr={refStr}
                            isToday={isToday}
                        />;
                        columns.push(dayView);
                        currentDay++;
                    }
                    // 月后多余的空白格
                    else {
                        var dayView = <Day
                            onDayClickCallBack={this.onDayClickCallBack}
                            key={j}
                            day=""
                            row={i}
                            colume={j}
                            navigator={this.props.navigator}
                            onClickBle={false}
                            myear={this.props.year}
                            mMonth={this.props.month}
                            dataMap={this.props.dataMap}
                            dataContent={null}
                            classTag={this.props.classTag}
                        />;
                        columns.push(dayView);

                    }
                }
                // 月前多余的空白格
                else {
                    var dayView = <Day
                        onDayClickCallBack={this.onDayClickCallBack}
                        key={j}
                        day=""
                        row={i}
                        colume={j}
                        navigator={this.props.navigator}
                        onClickBle={false}
                        myear={this.props.year}
                        mMonth={this.props.month}
                        dataMap={this.props.dataMap}
                        dataContent={null}
                        classTag={this.props.classTag}
                    />;
                    columns.push(dayView);
                }

                slotsAccumulator++;
            }
            matrix[i] = [];
            matrix[i].push(<View style={styles.weekRow}>{columns}</View>);
        }
        //下方加入留白防止课程详情显示不全
        matrix.push(<View key={'emptyview'} style={{height:100,backgroundColor:'#ffffff'}}>
            <View style={{height:1,backgroundColor:'#b1b1b1'}}/>


        </View>);
        return matrix;
    }

    render() {
        return (
            <View style={styles.daysWrapper}>

                { this.getCalendarDays() }
                {
                    this.state.isDialogWindowShow ? <View
                        style={{width:dialogWindowW,height:this.state.detailPopHeight,position: 'absolute',top:this.state.popTop,left:this.state.popLeft,bottom:0,right:0,backgroundColor:"#ffffff",        borderWidth: 1,
        borderColor: '#b1b1b1', }}>
                        <DMonthPageDayViewDetailay popDataContent={this.state.popDataContent}
                                                   classTag={this.props.classTag}
                                                   cancelClassInfoWindowCallBack={this.cancelClassInfoWindowCallBack}
                                                   monthPageDayViewDetailayPopItemChanged={this.MonthPageDayViewDetailayPopItemChanged}/>

                    </View> : null
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    daysWrapper: {
        alignSelf: 'center',
        backgroundColor: '#ffffff',
    },
    weekRow: {
        flexDirection: 'row'
    }
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = MonthPageDays;

