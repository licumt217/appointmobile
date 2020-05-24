import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getAppointmentsOfUsingByUserId,cancelAppointment} from '../../../http/service'
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";


class Index extends Component {

    constructor() {
        super();
        this.state = {
            appointments: [],

        }
        //
        this.getAppointmentsOfUsingByUserId();
    }

    /**
     * */
    getAppointmentsOfUsingByUserId = () => {
        getAppointmentsOfUsingByUserId().then((data) => {

            this.setState({
                appointments: data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }

    go2OrderList = (appointment) => {
        this.props.history.push({
            pathname: '/order/list',
            state:{
                appointment_id:appointment.appointment_id
            }
        })

    }

    cancel = (appointment) => {
        Util.confirm({
            title: '您确定取消吗？',
            msg: '',
            onConfirm: () => {
                cancelAppointment( {
                    appointment_id: appointment.appointment_id
                }).then((data) => {
                    Util.success("操作成功")
                    this.getAppointmentsOfUsingByUserId()

                }).catch(err => {
                    Util.fail(err)
                })
            },
            onCancel: () => {
            }
        })
    }

    appoint = () => {
        if (this.curAppoint) {
            Util.info("您有进行中的预约！")
            return;
        }
        this.props.history.push({
            pathname: '/therapist/search',
        })
    }

    emergencyConsult = () => {
        this.props.history.push({
            pathname: '/therapistList',
            isEmergency: true
        })
    }
    /**
     * 转介
     */
    transfer = () => {

        this.props.history.push({
            pathname: '/therapistListWithTransfer',
        })
    }


    render() {
        return (
            <div>
                <section>
                    <Card>
                        <Card.Header
                            title="进行中预约"
                        />
                        <Card.Body>
                            {this.state.appointments.length === 0 ?
                                <div className='center'>
                                    暂无预约
                                </div>
                                :
                                (
                                    this.state.appointments.map((appointment, index) => {
                                        return (
                                            <Card key={index} style={{marginBottom:'.5em'}}>
                                                <Card.Body>
                                                    <p>预约开始日期：{appointment.appoint_date.split(" ")[0]}</p>
                                                    <p>预约时段：{Util.getAppointPeriodStrFromArray(appointment)}</p>
                                                    <p>咨询师：{appointment.therapist_name}</p>
                                                    <p>房间：{appointment.room_name}</p>
                                                    <p>预约类型：{appointment.ismulti===1?'持续预约':'单次预约'}</p>
                                                    <p>预约状态：{ORDER_STATE_DESC[appointment.state]}</p>
                                                    <WhiteSpace/>
                                                    <Flex justify={"around"} align={"center"} alignContent={"center"}>
                                                        <Flex.Item style={{textAlign:'center'}}><Button type="ghost" size={"small"}
                                                                                                        onClick={this.go2OrderList.bind(this,appointment)}>订单记录</Button></Flex.Item>

                                                        {
                                                            appointment.state===ORDER_STATE.COMMIT?
                                                                <Flex.Item>
                                                                    <Button type="warning" size={"small"}
                                                                            onClick={this.cancel.bind(this,appointment)}>取消预约</Button>
                                                                </Flex.Item>
                                                                :
                                                                null
                                                        }

                                                    </Flex>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                )

                            }

                            <WhiteSpace />
                            <Flex>
                                <Flex.Item><Button type="primary" size={"small"}
                                                   onClick={this.appoint}>立即预约</Button></Flex.Item>
                                <Flex.Item><Button type="warning" size={"small"}
                                                   onClick={this.emergencyConsult}>紧急咨询</Button></Flex.Item>
                                <Flex.Item><Button type="ghost" size={"small"}
                                                   onClick={this.transfer}>转介</Button></Flex.Item>
                            </Flex>

                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}

export default Index;