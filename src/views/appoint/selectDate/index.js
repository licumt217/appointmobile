import React, {Component} from 'react';

import {Card, Flex, Checkbox, WhiteSpace, Switch,List,Button} from "antd-mobile";

import Util from "../../../assets/js/Util";

import DateUtil from "../../../assets/js/DateUtil";

import {getUseablePeriodSet, getAppointmentsOfUsingByTherapistId,addAppointment} from "../../../http/service";

import './index.less'

class Index extends Component {

    constructor(props) {
        super(props);

        this.therapist_id = this.props.location.state.therapist_id;

        this.state = {
            selectMonth: '',
            dataList: [],
            allAvailablePeriodArray: [],
            availablePeriodArray: [],
            nowDate: {},
            canAppointDate: {},
            date: {},
            selectPeriodArray: [],
            isMulti: false,

        }
    }

    componentDidMount() {
        this.getPeriodSet().then(data => {
            this.getCanAppointDate().then(data => {

                this.setState({
                    canAppointDate: data,
                    nowDate: new Date()
                })
                this.realSwitch(new Date(this.state.nowDate.getFullYear(), this.state.nowDate.getMonth(), this.state.nowDate.getDate()))
            })
        })
    }

    getFirstDayOfGivenDate = (date) => {
        let date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        date2.setDate(1);
        return date2;
    }

    getLastDayOfGivenDate = (date) => {
        let currentMonth = date.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
    }

    getDateByIndex = (index) => {
        return new Date(this.state.date.getFullYear(), this.state.date.getMonth(), index)
    }

    realSwitch = (date) => {
        this.setState({
            date,
        })

        let dataList = []

        let firstDay = this.getFirstDayOfGivenDate(date);

        let lastDay = this.getLastDayOfGivenDate(date);

        let firstWeekIndex = firstDay.getDay();

        for (let i = 0; i < firstWeekIndex; i++) {
            dataList.push({
                num: ''
            });
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            dataList.push({
                num: i,
                date: this.getDateByIndex(i)
            })
        }

        let selectMonth = `${this.state.date.getFullYear()}年${this.state.date.getMonth() + 1}月`

        this.setState({
            date,
            dataList,
            selectMonth
        })


        this.getOccupyedPeriod();
    }

    /**
     * 计算某日具体的剩余可预约时段
     * isAppointedBefore 某日之前一次也没预约过
     * */
    calAvailablePeriod = (item, isAppointedBefore = false, occupiedPeriodArray) => {
        if (isAppointedBefore) {
            occupiedPeriodArray = Array.from(new Set(occupiedPeriodArray))

            let tempAllArray = JSON.parse(JSON.stringify(this.state.allAvailablePeriodArray))

            occupiedPeriodArray.forEach((item, index) => {
                if (tempAllArray.includes(item)) {
                    let index = tempAllArray.findIndex(function (d) {
                        return d === item;
                    })
                    tempAllArray.splice(index, 1)
                }
            })

            item.periods = tempAllArray;

            return item
        } else {
            item.periods = JSON.parse(JSON.stringify(this.state.allAvailablePeriodArray))
            return item;
        }
    }

    /**
     * 根据给定日期获取此日期所在月份此咨询师已经有了哪些预约。
     */
    getOccupyedPeriod = () => {

        getAppointmentsOfUsingByTherapistId({
            therapist_id: this.therapist_id,
        }).then((data) => {

            this.setState({
                availablePeriodArray:[]
            })

            let dataList = this.state.dataList;


            //说明没有别人占用的，所有日期都可以预约
            if (data.length === 0) {

                dataList.forEach((item, index) => {
                    if (item.date) {
                        if (DateUtil.isBefore(item.date, this.state.canAppointDate) && !DateUtil.isBefore(item.date, this.state.nowDate) && this.state.allAvailablePeriodArray.length > 0) {
                            item.canAppoint = true;
                            item = this.calAvailablePeriod(item)
                            dataList.splice(index, 1, item);
                        }
                    }


                })
                this.setState({
                    dataList
                })
            } else {

                let weekMap = {}
                let singleMap = {}
                data.forEach(item => {

                    let date = new Date(item.appoint_date)

                    let week = DateUtil.getWeekOfDate(date)

                    let periodArray = item.period.split(',')

                    //持续的预约
                    if (item.ismulti === 1) {
                        if (weekMap[week]) {
                            weekMap[week] = weekMap[week].concat(periodArray);
                        } else {
                            weekMap[week] = periodArray
                        }
                    } else {//单次预约
                        if (singleMap[date]) {
                            singleMap[date]=singleMap[date].concat(periodArray);
                        } else {
                            singleMap[date] = periodArray
                        }
                    }
                })



                dataList.forEach((item, index) => {
                    if (item.date) {
                        let week = DateUtil.getWeekOfDate(item.date);

                        if (!weekMap[week]) {
                            if (DateUtil.isBefore(item.date, this.state.canAppointDate) && !DateUtil.isBefore(item.date, this.state.nowDate) && this.state.allAvailablePeriodArray.length > 0) {

                                //当前所在的周几的第几个时段，必须要当前日期大于最大的已占用日期
                                let period2 = this.getCanAppointPeriod(item.date, singleMap)

                                if (period2.length > 0) {
                                    item.canAppoint = true;
                                    item.periods = period2;
                                    dataList.splice(index, 1, item);
                                }

                            }
                        } else {
                            if (DateUtil.isBefore(item.date, this.state.canAppointDate) && !DateUtil.isBefore(item.date, this.state.nowDate) && this.state.allAvailablePeriodArray.length > 0) {

                                //当前所在的周几的第几个时段，必须要当前日期大于最大的已占用日期
                                let period2 = this.getCanAppointPeriod(item.date, singleMap, weekMap[week])
                                if (period2.length > 0) {
                                    item.canAppoint = true;
                                    item.periods = period2;
                                    dataList.splice(index, 1, item);
                                }

                            }
                        }

                    }


                })


                this.setState({
                    dataList
                })


            }


        }).catch(err => {
            Util.fail(err)
        })
    }


    /**
     * 获取给定日期能预约的时段
     * @param date
     * @param usedPeriodArray 已经长期预约的时段，此时不可用
     * @returns {[]}
     */
    getCanAppointPeriod = (date, singleMap, usedPeriodArray) => {

        let periodDateMap = {}

        for (let date2 in singleMap) {
            date2 = new Date(date2)
            let w = DateUtil.getWeekOfDate(date2)

            let dateWeek = DateUtil.getWeekOfDate(date)
            let period2 = singleMap[date2]
            if (w === dateWeek) {
                period2.forEach(item => {
                    if (periodDateMap[item]) {
                        if (periodDateMap[item].getTime() < date2.getTime()) {
                            periodDateMap[item] = date2;
                        }
                    } else {
                        periodDateMap[item] = date2;
                    }
                })
            }
        }

        let array = []

        let tempAllArray = JSON.parse(JSON.stringify(this.state.allAvailablePeriodArray))
        if (usedPeriodArray && usedPeriodArray.length > 0) {
            usedPeriodArray.forEach(item => {
                if (tempAllArray.includes(item)) {
                    let index = tempAllArray.findIndex(d => d === item);
                    tempAllArray.splice(index, 1);
                }
            })
        }

        tempAllArray.forEach(item => {
            if (periodDateMap[item]) {
                if (date.getTime() > periodDateMap[item].getTime()) {
                    array.push(item);
                }
            } else {
                array.push(item);
            }
        })
        return array;


    }


    isPeriodHasBeenUsed = (curPeriodArray) => {

        curPeriodArray = Array.from(new Set(curPeriodArray))
        return curPeriodArray.length >= this.state.allAvailablePeriodArray.length;
    }


    /**
     * 获取咨询师可预约到的日期
     * TODO 需要后台添加个接口。按照现有需求，此限制应该可以去掉了。
     * */
    getCanAppointDate = () => {

        return new Promise(function (resolve) {
            resolve(new Date(2020, 7, 21))
        })
    }

    /**
     * 咨询师设置的可用时段列表
     * */
    getPeriodSet = () => {
        return new Promise(resolve => {

            getUseablePeriodSet({
                therapist_id: this.therapist_id
            }).then((data) => {
                this.setState({
                    allAvailablePeriodArray: data.period.split(',')
                })
                resolve()
            }).catch(err => {
                Util.fail(err)
            })
        })


    }


    switchMonth = (type) => {
        if (type === 1) {//下一月
            let date=this.state.date;
            date.setMonth(this.state.date.getMonth() + 1)
            this.setState({
                date
            })
            this.realSwitch(this.state.date)
        } else {

            if (this.state.date.getTime() > this.state.nowDate.getTime()) {

                let date=this.state.date;
                date.setMonth(this.state.date.getMonth() + -1)
                this.setState({
                    date
                })
                this.realSwitch(this.state.date);
            }


        }
    }

    resetSelectArray() {
        this.setState({
            selectPeriodArray: [],
            isMulti:false
        })
    }

    /**
     * 日历某天按钮的显示状态重置
     * */
    resetBtnStatus = () => {
        let dataList = this.state.dataList
        dataList.forEach((item, index) => {
            item.active = false;
            dataList.splice(index, 1, item);
        })
        this.setState({
            dataList
        })
    }

    /**
     * 根据给定日期查询当日此咨询师的可预约时段。
     * */
    queryPeriodsByDate = (item, index2) => {


        this.resetBtnStatus();
        this.resetSelectArray()
        item.active = true;

        let dataList = this.state.dataList
        dataList.splice(index2, 1, item);


        this.setState({
            availablePeriodArray: item.periods,
            appoint_date: item.date,
            dataList
        })
    }

    handlePeriodChange = (period) => {
        let array = this.state.selectPeriodArray;

        if (array.includes(period)) {
            array.splice(array.findIndex(period), 1)
        } else {
            array.push(period)
        }

        array.sort();

        this.setState({
            selectPeriodArray: array
        })


    }

    next=()=> {

        if (!this.state.selectPeriodArray || this.state.selectPeriodArray.length === 0) {
            Util.info('请选择预约时段!')
            return;
        }

        addAppointment( {
            amount: 0.01,
            therapist_id: this.therapist_id,
            appoint_date: DateUtil.format(this.state.appoint_date),
            periodArray: this.state.selectPeriodArray,
            isMulti: this.state.isMulti
            // consult_type_id:this.consult_type_id,
            // manner_type_id:this.manner_type_id,
        }).then((data) => {
            Util.info('提交成功，请等待咨询师审核')

            this.props.history.push('/appoint/myAppoint')

        }).catch(err => {
            Util.fail(err)
        })

    }

    render() {

        const weekArray = ['日', '一', '二', '三', '四', '五', '六'];

        return (
            <div>
                <Card>
                    <Card.Header title={'请选择预约日期'}/>
                    <Card.Body>

                        <section className={'switch_wrapper'}>
                            <div className="switch" onClick={this.switchMonth.bind(this, 0)}>
                                &lt;
                            </div>
                            <div className="date_content">
                                {this.state.selectMonth}
                            </div>
                            <div className="switch" onClick={this.switchMonth.bind(this, 1)}>
                                &gt;
                            </div>
                        </section>


                        <section>
                            {
                                weekArray.map((item, index) => {
                                    return (
                                        <div className="week" key={index}>
                                            <p>
                                                <span className="">
                                                    {item}
                                                </span>
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </section>

                        <section>
                            {
                                this.state.dataList.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                item.num ?
                                                    <p className={'center num'}>
                                                        {
                                                            item.canAppoint ?
                                                                <span
                                                                    onClick={this.queryPeriodsByDate.bind(this, item, index)}
                                                                    className={`able_appoint btn ${item.active ? 'btn_active' : ''}`}
                                                                >
                                                            {item.num}
                                                        </span>
                                                                :
                                                                <span className="disable_appoint">
                                                                    {item.num}
                                                                </span>
                                                        }

                                                    </p>
                                                    : <p className={'center num'}></p>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </section>
                        {
                            this.state.availablePeriodArray.length > 0 ?
                                <React.Fragment>
                                    <WhiteSpace/>
                                    <Card>
                                        <Card.Header title={'请选择预约时段'}></Card.Header>
                                        <Card.Body>
                                            <Flex wrap='wrap'>
                                                {
                                                    this.state.availablePeriodArray.map((period, index) => {
                                                        return (


                                                            <Flex.Item className='inline' style={{minWidth: '40%'}}
                                                                       key={index}>
                                                                <Checkbox.CheckboxItem key={period} checked={this.state.selectPeriodArray.includes(period)}
                                                                                       onChange={this.handlePeriodChange.bind(this, period)}>
                                                                    {`${period}:00-${period}:50`}
                                                                </Checkbox.CheckboxItem>
                                                            </Flex.Item>

                                                        )
                                                    })
                                                }
                                            </Flex>
                                        </Card.Body>
                                    </Card>
                                    <section>
                                        <List.Item extra={<Switch platform="android" checked={this.state.isMulti} onChange={() => {
                                            this.setState({
                                                isMulti: !this.state.isMulti,
                                            });
                                        }}></Switch>}>
                                            是否连续预约
                                        </List.Item>
                                        <WhiteSpace/>
                                        <Button type='primary' onClick={this.next}>确定</Button>
                                    </section>
                                </React.Fragment>
                                : null
                        }


                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Index;
