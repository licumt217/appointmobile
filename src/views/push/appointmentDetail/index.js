import React, {Component} from 'react';

import {Card, List, Button, Flex, WingBlank, WhiteSpace} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {getAppointmentDetail, confirmOrder, denyAppointment, pay, doneAppointment} from "../../../http/service";

import PayUtil from "../../../assets/js/PayUtil";

import APPOINTMENT_STATE_DESC from "../../../assets/js/constants/APPOINTMENT_STATE_DESC";
import APPOINTMENT_STATE from "../../../assets/js/constants/APPOINTMENT_STATE";
import PAY_MANNER from "../../../assets/js/constants/PAY_MANNER";
import APPOINTMENT_MULTI from "../../../assets/js/constants/APPOINTMENT_MULTI";

class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment_id = Util.getUrlParam('appointment_id')
        // this.appointment_id = 'a55af5bc1bf54ef197c826e6b5af5ba3'

        this.state = {
            isShowComplain: false,
            appointment: {
                pay_manner: PAY_MANNER.BEFORE_SINGLE,
                state: 0
            },
            user_type: '',


        }
    }

    componentDidMount() {
        this.getAppointmentDetail()
    }

    getAppointmentDetail = () => {
        getAppointmentDetail({
            appointment_id: this.appointment_id
        }).then((data) => {
            if (data) {
                this.setState({
                    appointment: data
                })
            } else {
                Util.fail('预约不存在')
            }


        }).catch(err => {
            Util.fail(err)
        })
    }


    deny = () => {

        Util.confirm({
            msg: '您确定拒绝吗？',
            onCancel() {
            },
            onConfirm: () => {
                denyAppointment({
                    appointment_id: this.appointment_id
                }).then((data) => {
                    Util.success('操作成功')
                    this.getAppointmentDetail()

                }).catch(err => {
                    Util.fail(err)
                })
            }
        })

    }

    pay = () => {
        pay({
            order_id: this.state.appointment.order_id,
        }).then((data) => {

            PayUtil.pay(data.secuParam, this.getAppointmentDetail, this.getAppointmentDetail)

        }).catch(err => {
            Util.fail(err)
        })
    }

    accept = () => {
        // sessionStorage.appointment=JSON.stringify(this.state.appointment)

        this.props.history.push({
            pathname: '/push/acceptAppointment',
            state: {
                appointment: this.state.appointment
            }
        })
    }


    showComplainModal = () => {
        this.setState({
            isShowComplain: true
        })
    }

    hideComplainModal = () => {
        this.setState({
            isShowComplain: false
        })
    }

    handleAfterComplain = () => {
        this.hideComplainModal();
        this.getAppointmentDetail();
    }

    /**
     * 咨询师能否主动完成预约（结束）
     * 当前预约状态必须是已审核
     * 当前预约对应的所有订单必须都是最终状态：已拒绝、已取消、已过期、已完结。
     */
    done = () => {
        doneAppointment({
            appointment_id: this.state.appointment.appointment_id
        }).then((data) => {
            Util.success('操作成功')
            this.getAppointmentDetail()

        }).catch(err => {
            Util.fail(err)
        })
    }


    render() {
        return (
            <div>
                <Card>
                    <Card.Header title={'预约详情'}/>
                    <Card.Body>
                        <List>
                            <List.Item>
                                <p>预约开始日期：{this.state.appointment.appoint_date}</p>
                            </List.Item>
                            <List.Item>
                                <p>预约时段：{Util.getAppointmentPeriodStrFromArray(this.state.appointment.period)}</p>
                            </List.Item>
                            <List.Item>
                                <p>咨询师：{this.state.appointment.therapist_name}</p>
                            </List.Item>
                            <List.Item>
                                <p>用户：{this.state.appointment.user_name}</p>
                            </List.Item>
                            <List.Item>
                                <p>持续预约：{this.state.appointment.ismulti === APPOINTMENT_MULTI.CONTINUE ? '是' : '否'}</p>
                            </List.Item>
                            <List.Item>
                                <p>预约状态：{APPOINTMENT_STATE_DESC[this.state.appointment.state]}</p>
                            </List.Item>
                        </List>
                    </Card.Body>
                </Card>

                {
                    this.state.user_type === 'user' ?
                        (
                            this.state.appointment.pay_manner === PAY_MANNER.BEFORE_SINGLE ?
                                (
                                    this.state.appointment.state === APPOINTMENT_STATE.AUDITED ?
                                        (
                                            <Button size={"small"} type={"ghost"} onClick={this.pay}>立即支付</Button>
                                        )
                                        : (null)
                                )
                                : (null)
                        )
                        : (
                            this.state.appointment.state === APPOINTMENT_STATE.COMMIT ?
                                (
                                    <WingBlank>
                                        <WhiteSpace/>
                                        <Flex>
                                            <Flex.Item>
                                                <Button size={"small"} type={"ghost"} onClick={this.accept}>接受咨询</Button>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <Button size={"small"} type={"warning"} onClick={this.deny}>拒绝咨询</Button>
                                            </Flex.Item>
                                        </Flex>
                                    </WingBlank>
                                )
                                : (


                                    // 预约本身状态：已下单、已审核、已拒绝、已完成
                                    this.state.appointment.state === APPOINTMENT_STATE.AUDITED ?
                                        (
                                            <WingBlank>
                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <Button size={"small"} type={"ghost"} onClick={this.done}>确认完成</Button>
                                                    </Flex.Item>
                                                    {/*<Flex.Item>*/}
                                                    {/*    <Button size={"small"} type={"ghost"}*/}
                                                    {/*            onClick={this.showComplainModal}>投诉用户</Button>*/}
                                                    {/*</Flex.Item>*/}
                                                </Flex>

                                            </WingBlank>
                                        )
                                        :
                                        (
                                            null
                                        )


                                )
                        )
                }

            </div>
        );
    }
}

export default Index;