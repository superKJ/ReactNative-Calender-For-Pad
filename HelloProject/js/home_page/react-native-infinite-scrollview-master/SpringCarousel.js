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
    ScrollView,
    Dimensions,
    Image,
    ViewPagerAndroid,
    PanResponder,
    NativeModules
}
    from
        'react-native';
Carousel = require('react-native-spring-carousel');

import WeekPageDayTitle from '../WeekPageDayTitle'
import WeekPageDayContent from '../WeekPageDayContent'
const WEEKDAYS2 = [
    '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
];
var {
    MAX_COLUMNS,
    getDaysInMonth
    } = require('../../Utils/Util');
//一共有9行
const CONTENT_COUNT = 9;

let toDayCurrentTag = 0
//周控件有几页
let mpageCount = 0;
class SpringCarousel extends Component {
    // 构造
    constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            selectedRefTag: null,
        };
    }

    handleDaysChangeLast() {

    }

    handleDaysChangeNext() {

    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onPanResponderGrant: this._onPanResponderGrant,//处理按下的事件
            onPanResponderMove: this._onPanResponderMove,//处理移动的事件
        });
    }

    _onPanResponderGrant = (event, gestureState) => {
        let touchPonitX = gestureState.x0;//获取触摸点的横坐标
        return false;
    }

    _onPanResponderMove = (event, gestureState) => {
        let touchPonitX = gestureState.moveX;
        return false;
    }
    // 设置页面显示页下标
    setPage() {
        this.refs.ViewPagerAndroid.setPage(0);
    }

    // 取消之前item的选中状态
    setCancelSelectItem() {
        if (this.state.selectedRefTag != null) {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(false);
        }
    }


    // ViewPager滚动到今天所在的页
    setPageCurrentDay() {
        let today = new Date();
        let todayYear = today.getFullYear()
        let todayMonth = today.getMonth()
        if (this.props.myear == todayYear && this.props.mmonth == todayMonth) {
            this.refs.ViewPagerAndroid.setPage(toDayCurrentTag);
        }
        else {
            this.setPage();
        }
    }

    _scrollEnded(event) {
    }

    /**
     * 纵向内容列
     * */
    setWeekViewColumn(pageCountTag, mdayTag, rowNo, maxPageCount) {
        var dayColumns = [];
        for (var j = 0; j < MAX_COLUMNS; j++) {
            var mkey = 'column' + j;
            //周视图中如果一天代表一列，那么columnTag表示哪一天对应的列
            var columnTag = MAX_COLUMNS * pageCountTag + j;
            var weekPageDayContentBgColor
            if (mdayTag[columnTag] === '') {
                weekPageDayContentBgColor = '#bfbfbf'
            }
            else {
                weekPageDayContentBgColor = '#ffffff'
            }
            //for (var key in this.props.dataMap) {
            //    console.log("map[" + key + "]" + JSON.stringify(this.props.dataMap[key]));
            //}
            var key = this.props.myear + "-" + (this.props.mmonth + 1) + "-" + mdayTag[columnTag] + "^" + rowNo;
            //console.log("keykey="+key)
            var mvalue = this.props.dataMap[key];
            // 剔除上个月显示在第一页的数据
            if (pageCountTag == 0 && mdayTag[columnTag] > 7) {
                mvalue = null;
            }
            // 剔除下个月在最后一页的数据
            else if (pageCountTag == (maxPageCount - 1) && mdayTag[columnTag] < 7) {
                mvalue = null;
            }
            else {

            }
            let bgColor;
            let txColor;
            let tttype;
            if (mvalue != null) {
                if (mvalue.TTType == 0) {
                    bgColor = '#cae6f4'
                    txColor = '#000000'
                    tttype = 0;
                }
                else if (mvalue.TTType == 1) {
                    bgColor = '#cae6f4'
                    txColor = '#000000'
                    tttype = 1;
                }
                else if (mvalue.TTType == 2) {
                    bgColor = '#cae6f4'
                    txColor = '#000000'
                    tttype = 2;
                }
                else {

                }
            }
            let refStr = columnTag + ":" + rowNo + ':' + pageCountTag;
            dayColumns.push(
                <WeekPageDayContent ref={refStr} key={mkey}
                                    bgColor={weekPageDayContentBgColor}
                                    WeekPageDayContent={mvalue} bgContentColor={bgColor} txColor={txColor}
                                    tttype={tttype} getOnItemClickCallback={this.getOnItemClickCallback}
                                    refTag={refStr} rowNo={rowNo}
                />
            );
        }
        return dayColumns;
    }

    // 哪个单元被选中
    getOnItemClickCallback = (data) => {
        if (this.state.selectedRefTag != null) {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(false);
        }
        this.refs[data].getOnChangeBackGroud(true);
        this.setState({
            selectedRefTag: data
        }, function () {
            this.refs[this.state.selectedRefTag].getOnChangeBackGroud(true);
        });
    }

    /**
     * 日期横向有几排
     * */
    setWeekViewRow(pageCountTag, mdayTag, maxPageCount) {


        var dayRows = [];
        var columnTag = 0;
        for (var i = 0; i < CONTENT_COUNT; i++) {
            var mkey = "row" + i;
            // 添加每一排的View
            if (i == 0) {
                dayRows.push(<View key={mkey}
                                   style={[{flex:1,justifyContent:'center',alignItems :'center',height:38}]}>
                    <View style={{flexDirection:'row',flex:1,width:screenWidth-2*leftMenuWidth}}>
                        {this.setWeekViewTitle(pageCountTag, mdayTag, maxPageCount)}

                    </View>
                </View>);
            }
            else {
                dayRows.push(<View key={mkey}
                                   style={[{flex:1,justifyContent:'center',alignItems :'center',height:73}]}>
                    <View style={{flexDirection:'row',flex:1,width:screenWidth-2*leftMenuWidth}}>
                        {this.setWeekViewColumn(pageCountTag, mdayTag, i, maxPageCount)}
                    </View>
                </View>);
            }

        }
        return dayRows;
    }

    /**
     * 纵向标题页（星期几）
     * */
    setWeekViewTitle(pageCountTag, mdayTag, maxPageCount) {
        var dayTitles = [];
        //
        let today = new Date();
        let todayYear = today.getFullYear()
        let todayMonth = today.getMonth()
        let todayDay = today.getDate()
        let isToday = false;
        // 如果今天是1号，保证两边都是比如1号的情况下只有本月的1号有红色标识
        let indexHead = mdayTag.findIndex(x => x == 1);
        let indexEnd = mdayTag.findIndex(function (value, index, arr) {
            return value == 1 && index > indexHead;
        });
        if (indexEnd == -1) {
            indexEnd = mdayTag.length;
        }
        for (j = 0; j < MAX_COLUMNS; j++) { // Day columns
            var tag = pageCountTag * MAX_COLUMNS + j;
            var mkey = 'title' + j
            if (this.props.myear == todayYear && this.props.mmonth == todayMonth && mdayTag[tag] == todayDay && tag < indexEnd && tag >= indexHead) {
                isToday = true
                toDayCurrentTag = pageCountTag;
            }
            else {
                isToday = false
            }
            //
            dayTitles.push(
                <WeekPageDayTitle key={mkey} mdayTag={mdayTag} tag={tag}
                                  titleName={WEEKDAYS2[j]}
                                  myear={this.props.myear} mmonth={this.props.mmonth} isToday={isToday}/>
            );
        }
        return dayTitles;
    }

    /**
     * 月数值填充，滚动视图有几页计算
     * */
    setScrollPage() {
        mpageCount = 0;
        mdayTag = [];

        //算出周控件一共有几页
        currentDay = 0,
            thisMonthFirstDay = this.props.startFromMonday ? new Date(this.props.myear, this.props.mmonth, 0) : new Date(this.props.myear, this.props.mmonth, 1),
            slotsAccumulator = 0;
        lastMonthDay = new Date(this.props.myear, this.props.mmonth, 0).getDate();
        while (currentDay < getDaysInMonth(this.props.mmonth, this.props.myear)) {
            for (j = 0; j < MAX_COLUMNS; j++) { // Day columns
                if (slotsAccumulator >= thisMonthFirstDay.getDay()) {
                    if (currentDay < getDaysInMonth(this.props.mmonth, this.props.myear)) {
                        mdayTag.push(currentDay + 1);
                        currentDay++;
                    }
                } else {
                    mdayTag.push(lastMonthDay - thisMonthFirstDay.getDay() + 1 + j);
                }
                slotsAccumulator++;
            }
            mpageCount++;
        }
        //假设有5页，dayTag数组中应该有5*7=35个元素，但是上面代码一共只能
        //给dayTag赋值 前面空白+本月日期 个元素，所以不够的元素需要补齐
        var length = mdayTag.length;
        for (var i = 0; i < (MAX_COLUMNS * mpageCount - length); i++) {
            mdayTag[length + i] = i + 1;
        }
        //for (var i = 0; i < mdayTag.length; i++) {
        //    if (mdayTag[i] == 1) {
        //        NativeModules.LoginRNToNativeModule.HandleMessageLog('首页所在=' + i);
        //    }
        //}
        var scrollPage = [];
        //
        for (var i = 0; i < mpageCount; i++) {
            var mkey = 'page' + i;
            // i是每页下标，mpageCount是一共有多少页
            scrollPage.push(
                <View key={mkey} style={{width:screenWidth-2*leftMenuWidth,height:screenheight-186}}>
                    {this.setWeekViewRow(i, mdayTag, mpageCount)}
                </View>
            );
        }
        return scrollPage;
    }

    onPressSlide(index) {
        return false;
    }

    onCalendarTitleClick = (data) => {
    }

    render() {
        var viewPagerAndroidKey = mpageCount
        return (

            <View style={styles.mainViewStyle}>



                <ViewPagerAndroid
                    key={viewPagerAndroidKey}
                    ref="ViewPagerAndroid"
                    style={styles.viewPager}
                    initialPage={0}>

                    {this.setScrollPage()}


                </ViewPagerAndroid>
            </View>

        );
    }
}
var screenWidth = Dimensions.get('window').width;
var screenheight = Dimensions.get('window').height;
//周日期控件距离左侧的距离
const leftMenuWidth = 0;
const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    borderViewStyle: {
        borderColor: 'rgba(0,0,0,0.2)'
    },
    borderRowViewStyle: {
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    borderColumnViewStyle: {
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    viewPager: {
        flex: 1,
    },
});
/**
 * 文件名xxx.js
 * module.exports = xxx;
 * 类名class xxx extends Component
 * 要保持一致
 * */
module.exports = SpringCarousel;

