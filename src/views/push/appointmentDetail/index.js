import React, {Component} from 'react';

import {Card, List, Button, Flex, WingBlank, WhiteSpace} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {getAppointmentDetail, confirmOrder, denyAppointment,pay} from "../../../http/service";

import PayUtil from "../../../assets/js/PayUtil";

import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import ComplainModal from "../../appoint/components/ComplainModal";

class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment_id = Util.getUrlParam('appointment_id')
        // this.appointment_id = '0e6753b508314087982f95f4279441a7'

        this.state = {
            isShowComplain:false,
            order: {
                fee_type: 0,
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
                    order: data
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

    done = () => {
        confirmOrder({
            order_id: this.state.order.order_id
        }).then((data) => {
            Util.success('操作成功')
            // this.getAppointmentDetail()

        }).catch(err => {
            Util.fail(err)
        })
    }


    pay=()=> {
        pay({
            order_id:this.state.order.order_id,
        }).then((data) => {

            PayUtil.pay(data.secuParam,this.getAppointmentDetail,this.getAppointmentDetail)

        }).catch(err => {
            Util.fail(err)
        })
    }

    accept = () => {
        // sessionStorage.appointment=JSON.stringify(this.state.order)

        this.props.history.push({
            pathname:'/push/acceptAppointment',
            state:{
                appointment:this.state.order
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


    render() {
        return (
            <div>
                <Card>
                    <Card.Header title={'预约详情2'}/>
                    <Card.Body>
                        <List>
                            <List.Item>
                                <p>预约日期：{this.state.order.appoint_date}</p>
                            </List.Item>
                            <List.Item>
                                <p>预约时段：{Util.getAppointPeriodStrFromArray(this.state.order)}</p>
                            </List.Item>
                            <List.Item>
                                <p>咨询师：{this.state.order.therapist_name}</p>
                            </List.Item>
                            <List.Item>
                                <p>用户：{this.state.order.user_name}</p>
                            </List.Item>
                            <List.Item>
                                <p>订单状态2：{ORDER_STATE_DESC[this.state.order.state]}</p>
                            </List.Item>
                        </List>
                    </Card.Body>
                </Card>

                {
                    this.state.user_type === 'user' ?
                        (
                            this.state.order.fee_type === 0 ?
                                (
                                    this.state.order.state === ORDER_STATE.AUDITED ?
                                        (
                                            <Button size={"small"} type={"ghost"} onClick={this.pay}>立即支付</Button>
                                        )
                                        : (null)
                                )
                                : (null)
                        )
                        : (
                            this.state.order.state === ORDER_STATE.COMMIT ?
                                (
                                    <WingBlank>
                                        <WhiteSpace/>
                                        <Flex>
                                            <Flex.Item>
                                                <Button size={"small"} type={"ghost"} onClick={this.accept}>接受咨询</Button>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <Button size={"small"} type={"ghost"} onClick={this.deny}>拒绝咨询</Button>
                                            </Flex.Item>
                                        </Flex>
                                    </WingBlank>
                                )
                                : (
                                    <WingBlank>
                                        <WhiteSpace/>
                                        <Flex>
                                            <Flex.Item>
                                                <Button size={"small"} type={"ghost"} onClick={this.done}>确认完成</Button>
                                            </Flex.Item>
                                            <Flex.Item>
                                                <Button size={"small"} type={"ghost"}
                                                        onClick={this.showComplainModal}>投诉用户</Button>
                                            </Flex.Item>
                                        </Flex>
                                        {
                                            this.state.isShowComplain ?
                                                (
                                                    <ComplainModal user_type={'therapist'}
                                                                   order_id={this.state.order.order_id}
                                                                   onCancel={this.hideComplainModal}
                                                                   onSave={this.handleAfterComplain}/>
                                                )
                                                : (null)
                                        }
                                    </WingBlank>
                                )
                        )
                }

            </div>
        );
    }
}

export default Index;