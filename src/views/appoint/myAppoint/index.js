import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {
    getAppointmentsOfUsingByUserId,
    cancelAppointment,
    getAppointmentsOfUsingByTherapistId
} from '../../../http/service'
import APPOINTMENT_STATE from "../../../assets/js/constants/APPOINTMENT_STATE";
import APPOINTMENT_STATE_DESC from "../../../assets/js/constants/APPOINTMENT_STATE_DESC";
import APPOINTMENT_MULTI from "../../../assets/js/constants/APPOINTMENT_MULTI";
import PAY_MANNER_DESC from "../../../assets/js/constants/PAY_MANNER_DESC";
import store from "../../../store";
import ROLE from "../../../assets/js/constants/ROLE";


class Index extends Component {

    constructor() {
        super();
        this.state = {
            appointments: [],

        }
        //
        if (store.getState().role === ROLE.client) {
            this.getAppointmentsOfUsingByUserId();
        } else if (store.getState().role === ROLE.therapist) {
            this.getAppointmentsOfUsingByTherapistId()
        }

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
    /**
     * */
    getAppointmentsOfUsingByTherapistId = () => {
        getAppointmentsOfUsingByTherapistId({
            therapist_id:store.getState().user_id
        }).then((data) => {

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
            state: {
                appointment_id: appointment.appointment_id
            }
        })

    }

    cancel = (appointment) => {
        Util.confirm({
            title: '您确定取消吗？',
            msg: '',
            onConfirm: () => {
                cancelAppointment({
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
                                            <Card key={index} style={{marginBottom: '.5em'}}>
                                                <Card.Body>
                                                    <p>预约开始日期：{appointment.appoint_date.split(" ")[0]}</p>
                                                    <p>预约时段：{Util.getAppointmentPeriodStrFromArray(appointment.period)}</p>
                                                    <p>咨询师：{appointment.therapist_name}</p>
                                                    <p>房间：{appointment.room_name}</p>
                                                    <p>预约类型：{appointment.ismulti === APPOINTMENT_MULTI.CONTINUE ? '持续预约' : '单次预约'}</p>
                                                    <p>收费类型：{PAY_MANNER_DESC[appointment.pay_manner]}</p>
                                                    <p>预约状态：{APPOINTMENT_STATE_DESC[appointment.state]}</p>
                                                    <WhiteSpace/>
                                                    <Flex justify={"around"} align={"center"} alignContent={"center"}>
                                                        <Flex.Item style={{textAlign: 'center'}}><Button type="ghost"
                                                                                                         size={"small"}
                                                                                                         onClick={this.go2OrderList.bind(this, appointment)}>订单记录</Button></Flex.Item>

                                                        {
                                                            appointment.state === APPOINTMENT_STATE.COMMIT ?
                                                                <Flex.Item>
                                                                    <Button type="warning" size={"small"}
                                                                            onClick={this.cancel.bind(this, appointment)}>取消预约</Button>
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

                            <WhiteSpace/>
                            {
                                store.getState().role===ROLE.client?
                                    (
                                        <Flex>
                                            <Flex.Item><Button type="primary" size={"small"}
                                                               onClick={this.appoint}>立即预约</Button></Flex.Item>
                                            <Flex.Item><Button type="warning" size={"small"}
                                                               onClick={this.emergencyConsult}>紧急咨询</Button></Flex.Item>
                                            <Flex.Item><Button type="ghost" size={"small"}
                                                               onClick={this.transfer}>转介</Button></Flex.Item>
                                        </Flex>
                                    )
                                    :
                                    (
                                        null
                                    )
                            }

                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}

export default Index;