import React, {Component} from 'react';

import { Flex, List, Switch, Radio, WhiteSpace, Button, WingBlank} from "antd-mobile";

import {getRoomPeriodSetByStationId,getRoomListByTherapistNoPage,getAppointmentListOfUsingByStationId,acceptAppointment} from "../../../http/service";

import Util from "../../../assets/js/Util";

import DateUtil from "../../../assets/js/DateUtil";


class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment={}
        // this.appointment=JSON.parse(sessionStorage.appointment)

        this.state = {
            allRoomList:[],
            allAvailablePeriodArray:[],
            assign_room_type: "1",
            roomList: [
                {
                    room_id:1,
                    name:'房间1'
                },
                {
                    room_id:2,
                    name:'房间2'
                },
                {
                    room_id:3,
                    name:'房间3'
                },
            ],
            room_id: 1
        }
    }

    componentDidMount() {
        this.getRoomPeriodSet().then(data=>{
            this.getRooms();
        });
    }

    /**
     * 获取工作室下的房间可用时段设置
     * */
    getRoomPeriodSet=()=>{
        return new Promise((resolve, reject)=>{
            getRoomPeriodSetByStationId( {
                station_id:this.appointment.station_id
            }).then((data) => {

                this.setState({
                    allAvailablePeriodArray:data.period.split(',')
                })

                resolve();

            }).catch(err => {
                Util.fail(err)
            })
        })
    }
    isRoomPeriodsContainsAppointPeriods=()=>{

        let periods=this.appointment.period.split(',')

        let flag=true;
        for(let i=0;i<periods.length;i++){
            if(!this.state.allAvailablePeriodArray.includes(periods[i])){
                flag=false;
                break;
            }
        }
        return flag;
    }
    getRooms=()=> {

        getRoomListByTherapistNoPage({
            therapist_id:this.appointment.therapist_id
        }).then((data) => {

            this.setState({
                allRoomList:data
            })

        }).then(() => {
            getAppointmentListOfUsingByStationId( {
                station_id:this.appointment.station_id
            }).then((data) => {

                //说明没有别人占用的，所有都可以预约
                if (data.length === 0 && this.isRoomPeriodsContainsAppointPeriods()) {
                    this.setState({
                        roomList:this.state.this.allRoomList
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
                                singleMap[date].concat(periodArray);
                            } else {
                                singleMap[date] = periodArray
                            }
                        }
                    })


                    let roomList=this.state.roomList;
                    this.state.allRoomList.forEach((item, index) => {

                        let week = DateUtil.getWeekOfDate(this.appointment.appoint_date);

                        if(this.canAppointRoom(this.appointment,singleMap,weekMap[week])){
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
     * 看给定日期能否预约房间
     * @param date
     * @param usedPeriodArray 已经长期预约的时段，此时不可用
     * @returns {[]}
     */
    canAppointRoom=(appointment, singleMap, usedPeriodArray)=> {

        let periodDateMap = {}

        let dateWeek = DateUtil.getWeekOfDate(appointment.appoint_date)

        for (let date2 in singleMap) {
            date2=new Date(date2)
            let w = DateUtil.getWeekOfDate(date2)


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

        let appoint_periods=this.appointment.period.split(',');
        let flag=true;
        for(let m=0;m<appoint_periods.length;m++){
            let the_period=appoint_periods[m];

            if(usedPeriodArray && usedPeriodArray.includes(the_period)){
                flag=false;
                break;
            }

            if(periodDateMap[the_period] && new Date(this.appointment.appoint_date).getTime() < periodDateMap[the_period].getTime()){
                flag=false;
                break;
            }

        }

        return flag && this.isRoomPeriodsContainsAppointPeriods();


    }
    accept=()=> {

        if (this.state.assign_room_type === 1 && !this.room_id) {
            Util.info('请选择房间！')
            return;
        }


        acceptAppointment( {
            appointment_id: this.appointment.appointment_id,
            room_id: this.state.room_id,
            assign_room_type: this.state.assign_room_type,
        }).then((data) => {
            Util.success('操作成功')
            // this.$emit('callback')

        }).catch(err => {
            Util.fail(err)
        })
    }

    back=()=>{
        this.props.history.goBack()
    }


    onChange = (room_id) => {
        this.setState({
            room_id
        });
    }

    render() {
        return (
            <div>
                <List >
                    <List.Item><span style={{fontSize:'14px',fontWeight:'bold'}}>预约房间选择</span></List.Item>
                </List>
                <List.Item
                    extra={<Switch platform="android" checked={this.state.assign_room_type === "1"} onChange={() => {
                        this.setState({
                            assign_room_type: this.state.assign_room_type === "1" ? "0" : "1"
                        });
                    }}></Switch>}>
                    手动分配房间
                </List.Item>
                {
                    this.state.assign_room_type === "1" ?
                        (
                            this.state.roomList.length === 0 ?
                                (
                                    <div>无可用房间</div>
                                )
                                :
                                (
                                    <List>
                                        {
                                            this.state.roomList.map((room,index)=>{
                                                return (
                                                    <Radio.RadioItem key={index} checked={this.state.room_id === room.room_id} onChange={this.onChange.bind(this,room.room_id)}>
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