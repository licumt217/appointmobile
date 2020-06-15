import React, {Component} from 'react';

import {Flex, List, Switch, Radio, WhiteSpace, Button, WingBlank, Picker} from "antd-mobile";

import {
    getRoomPeriodSetByStationId,
    getRoomListByTherapistNoPage,
    getAppointmentListOfUsingByStationId,
    acceptAppointment
} from "../../../http/service";

import Util from "../../../assets/js/Util";
import store from "../../../store";
import DateUtil from "../../../assets/js/DateUtil";
import APPOINTMENT_MULTI from "../../../assets/js/constants/APPOINTMENT_MULTI";


class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment = this.props.location.state.appointment;

        this.state = {
            allRoomList: [],
            allAvailablePeriodArray: [],
            assign_room_type: 1,
            roomList: [],
            room_id: '',
            pay_manner: ''
        }
    }

    componentDidMount() {
        this.getRoomPeriodSet().then(data => {
            this.getRooms();
        });
    }

    /**
     * 获取工作室下的房间可用时段设置
     * */
    getRoomPeriodSet = () => {
        return new Promise((resolve, reject) => {
            getRoomPeriodSetByStationId({
                station_id: this.appointment.station_id
            }).then((data) => {

                this.setState({
                    allAvailablePeriodArray: data.period.split(',')
                })

                resolve();

            }).catch(err => {
                Util.fail(err)
            })
        })
    }
    isRoomPeriodsContainsAppointPeriods = () => {

        let periods = this.appointment.period.split(',')

        let flag = true;
        for (let i = 0; i < periods.length; i++) {
            if (!this.state.allAvailablePeriodArray.includes(periods[i])) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    getRooms = () => {

        getRoomListByTherapistNoPage({
            therapist_id: this.appointment.therapist_id
        }).then((data) => {

            this.setState({
                allRoomList: data,
                // room_id:data[0].room_id
            })

        }).then(() => {
            getAppointmentListOfUsingByStationId({
                station_id: this.appointment.station_id
            }).then((data) => {

                //说明没有别人占用的，所有都可以预约
                if (data.length === 0 && this.isRoomPeriodsContainsAppointPeriods()) {
                    this.setState({
                        roomList: this.state.allRoomList
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
                                weekMap[week].push({
                                    periodArray,
                                    room_id: item.room_id
                                })
                            } else {
                                weekMap[week] = [{
                                    periodArray,
                                    room_id: item.room_id
                                }]
                            }
                        } else {//单次预约
                            if (singleMap[date]) {
                                singleMap[date].push({
                                    periodArray,
                                    room_id: item.room_id
                                })
                            } else {
                                singleMap[date] = [{
                                    periodArray,
                                    room_id: item.room_id
                                }]
                            }
                        }
                    })

                    let roomList = [];
                    this.state.allRoomList.forEach((item, index) => {

                        let week = DateUtil.getWeekOfDate(this.appointment.appoint_date);

                        if (this.canAppointRoom(item, this.appointment, singleMap, weekMap[week])) {
                            roomList.push(item);
                        }

                    })

                    this.setState({
                        roomList
                    })


                }

            })

        }).catch(err => {
            Util.fail(err)
        })
    }

    /**
     * 判断数据是否包含另一个数组中的任意一个元素
     * @param array
     * @param anotherArray
     */
    arrayContainsAnotherArray = (array, anotherArray) => {
        return anotherArray.some((item) => {
            return array.includes(item);
        })
    }

    /**
     * 看给定日期能否预约房间
     * @param date
     * @param usedPeriodArray 已经长期预约的时段，此时不可用
     * @returns {[]}
     */
    canAppointRoom = (room, appointment, singleMap, usedPeriodArray) => {

        let appoint_periodArray = appointment.period.split(',');

        let appoint_date = new Date(appointment.appoint_date)

        //如果当前房间的当前周几有持续预约，直接不可用
        let flag = true;
        usedPeriodArray && usedPeriodArray.forEach(item => {
            if (item.room_id === room.room_id) {
                if (this.arrayContainsAnotherArray(item.periodArray, appoint_periodArray)) {
                    flag = false;
                }
            }
        })

        if (flag === false) {
            return flag;
        }

        //单次预约。1、房间号是否相同。2、预约时段是否有重叠。3、日期先后比对

        let dateWeek = DateUtil.getWeekOfDate(appointment.appoint_date)

        for (let date2 in singleMap) {
            date2 = new Date(date2)
            let w = DateUtil.getWeekOfDate(date2)

            let singleArray = singleMap[date2]

            singleArray.forEach(item => {
                if (item.room_id === room.room_id) {
                    if (this.arrayContainsAnotherArray(item.periodArray, appoint_periodArray)) {
                        if (date2.getTime() > appoint_date.getTime() && w === dateWeek) {
                            flag = false;
                        }
                    }
                }
            })

        }

        if (flag === false) {
            return flag;
        }


        return flag && this.isRoomPeriodsContainsAppointPeriods();


    }
    accept = () => {


        if (this.state.assign_room_type === 1 && !this.state.room_id) {
            Util.info('请选择房间！')
            return;
        }

        if (!this.state.pay_manner) {
            Util.info('请选择支付方式！')
            return;
        }


        acceptAppointment({
            appointment_id: this.appointment.appointment_id,
            room_id: this.state.room_id,
            assign_room_type: this.state.assign_room_type,
            pay_manner: this.state.pay_manner
        }).then((data) => {
            Util.success('操作成功')
            this.back();

        }).catch(err => {
            Util.fail(err)
        })
    }

    back = () => {
        this.props.history.goBack()
    }

    handleFormChange = (value) => {

        this.setState({
            pay_manner: value[0],
        })
    }


    onChange = (room_id) => {
        this.setState({
            room_id
        });
    }

    render() {
        return (
            <div>
                <List>
                    <List.Item><span style={{fontSize: '14px', fontWeight: 'bold'}}>选择房间</span></List.Item>
                </List>
                <List.Item
                    extra={<Switch platform="android" checked={this.state.assign_room_type === 1} onChange={() => {
                        this.setState({
                            assign_room_type: this.state.assign_room_type === 1 ? 0 : 1
                        });
                    }}></Switch>}>
                    手动分配房间
                </List.Item>
                {
                    this.state.assign_room_type === 1 ?
                        (
                            this.state.roomList.length === 0 ?
                                (
                                    <div>无可用房间</div>
                                )
                                :
                                (
                                    <List>
                                        {
                                            this.state.roomList.map((room, index) => {
                                                return (
                                                    <Radio.RadioItem key={index}
                                                                     checked={this.state.room_id === room.room_id}
                                                                     onChange={this.onChange.bind(this, room.room_id)}>
                                                        {room.name}
                                                    </Radio.RadioItem>
                                                )


                                            })
                                        }
                                    </List>
                                )
                        )
                        : null
                }
                <List>
                    <List.Item><span style={{fontSize: '14px', fontWeight: 'bold'}}>选择支付方式</span></List.Item>
                </List>
                <Flex>
                    <Flex.Item>
                        <Picker
                            data={this.appointment.ismulti === APPOINTMENT_MULTI.SINGLE ? Util.payMannerOptions.single : Util.payMannerOptions.multi}
                            cols={1}
                            extra="请选择"
                            value={[this.state.pay_manner]}
                            onOk={this.handleFormChange.bind(this)}
                        >
                            <List.Item arrow="horizontal">支付方式</List.Item>
                        </Picker>


                    </Flex.Item>

                </Flex>
                <WingBlank>
                    <WhiteSpace/>
                    <Flex>
                        <Flex.Item>
                            <Button size={"small"} type={"ghost"} onClick={this.back}>取消</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button size={"small"} type={"ghost"} onClick={this.accept}>确定</Button>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        );
    }
}

export default Index;