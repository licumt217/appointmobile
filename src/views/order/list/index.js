import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank, Checkbox, ActivityIndicator} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getOrdersByAppointmentId, pay, getAppointmentDetail, batchPay, cancelOrder,offlinePay,offlineBatchPay} from '../../../http/service'
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import PAY_MANNER from "../../../assets/js/constants/PAY_MANNER";
import PAY_MANNER_DESC from "../../../assets/js/constants/PAY_MANNER_DESC";
import PayUtil from "../../../assets/js/PayUtil";
import ComplainModal from "../../components/ComplainModal";
import FeedbackModal from "../../components/FeedbackModal";
import store from "../../../store";
import './index.less'
import ROLE from "../../../assets/js/constants/ROLE";
import APPOINTMENT_STATE from "../../../assets/js/constants/APPOINTMENT_STATE";
import FUNCTION_LEVEL from "../../../assets/js/constants/FUNCTION_LEVEL";

class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment_id = this.props.location.state.appointment_id
        this.orderIdSet = new Set();
        this.state = {
            orders: [],
            isShowComplain: false,
            isShowFeedback: false,
            order_id: '',
            appointment: {},
            showMain:false,
            function_level:FUNCTION_LEVEL.BASE

        }
        //
        this.getAppointmentDetail();

    }

    getAppointmentDetail = () => {
        getAppointmentDetail({
            appointment_id: this.appointment_id
        }).then((data) => {

            this.setState({
                appointment: data
            })
            this.getOrdersByAppointmentId();


        }).catch(err => {
            Util.fail(err)
        })
    }
    /**
     * */
    getOrdersByAppointmentId = () => {
        getOrdersByAppointmentId({
            appointment_id: this.appointment_id
        }).then((data) => {

            this.setState({
                orders: data,
                showMain:true
            })

        }).catch(err => {
            Util.fail(err)
        })
    }


    cancel = (order) => {
        Util.confirm({
            title: '您确定取消吗？',
            msg: '',
            onConfirm: () => {
                cancelOrder({
                    order_id: order.order_id
                }).then(() => {
                    Util.success("操作成功")
                    this.getAppointmentDetail()

                }).catch(err => {
                    Util.fail(err)
                })
            },
            onCancel: () => {
            }
        })
    }


    /**
     * 开通线上支付的话，直接线上支付；否则，用户确认已线下支付
     * @param order
     */
    pay = (order) => {
        if(this.state.appointment.function_level===FUNCTION_LEVEL.ONLINEPAY){
            pay({
                order_id: order.order_id
            }).then((data) => {

                PayUtil.pay(data.secuParam, this.getOrdersByAppointmentId, this.getOrdersByAppointmentId)

            }).catch(err => {
                Util.fail(err)
            })
        }else{
            Util.confirm({
                title:'支付确认',
                msg:'请您确认已线下支付过本次订单的费用',
                onConfirm:()=>{

                    offlinePay({
                        order_id:order.order_id
                    }).then(()=>{
                        Util.success(`支付成功`)
                        this.getOrdersByAppointmentId();
                    }).catch(err => {
                        Util.fail(err)
                    })
                }
            })
        }

    }

    showComplain = (order) => {
        this.setState({
            isShowComplain: true,
            order_id: order.order_id
        })

    }

    hideComplain = () => {
        this.setState({
            isShowComplain: false
        })
    }

    showFeedback = (order) => {
        this.setState({
            isShowFeedback: true,
            order_id: order.order_id
        })

    }

    hideFeedback = () => {
        this.setState({
            isShowFeedback: false
        })
    }

    onChange = (order_id) => {
        if (this.orderIdSet.has(order_id)) {
            this.orderIdSet.delete(order_id)
        } else {
            this.orderIdSet.add(order_id)
        }

    }

    allPay = () => {
        if (this.orderIdSet.size > 0) {
            if(this.state.appointment.function_level===FUNCTION_LEVEL.ONLINEPAY){
                batchPay({
                    order_id_array: [...this.orderIdSet]
                }).then((data) => {

                    PayUtil.pay(data.secuParam, this.getOrdersByAppointmentId, this.getOrdersByAppointmentId)

                }).catch(err => {
                    Util.fail(err)
                })
            }else{
                offlineBatchPay({
                    order_id_array: [...this.orderIdSet]
                }).then((data) => {
                    Util.success(`支付成功`)
                    this.getOrdersByAppointmentId();

                }).catch(err => {
                    Util.fail(err)
                })
            }

        } else {
            Util.info('请选择要支付的订单！')
        }

    }




    render() {
        return (
            <div>
                {
                    this.state.isShowComplain ?
                        (
                            <ComplainModal user_type={'therapist'} show={this.state.isShowComplain}
                                           order_id={this.state.order_id}
                                           onHide={this.hideComplain}
                            />
                        )
                        : (null)
                }

                {
                    this.state.isShowFeedback ?
                        (
                            <FeedbackModal show={this.state.isShowFeedback}
                                           order_id={this.state.order_id}
                                           onHide={this.hideFeedback}
                            />
                        )
                        : (null)
                }
                {
                    this.state.showMain?
                        <section>
                            <Card>
                                <Card.Header
                                    title="订单记录"
                                />
                                <Card.Body>
                                    {this.state.orders.length === 0 ?
                                        <div className='center' style={{marginTop:".8em"}}>
                                            暂无数据
                                        </div>
                                        :
                                        (
                                            <React.Fragment>
                                                {
                                                    this.state.orders.map((item, index) => {
                                                        return (
                                                            <Card key={index}>
                                                                <Card.Body>
                                                                    {
                                                                        (this.state.appointment.pay_manner === PAY_MANNER.AFTER_MONTH && store.getState().role === ROLE.client) ?
                                                                            <div className='checkbox-right-top'>
                                                                                <Checkbox.CheckboxItem
                                                                                    disabled={item.state !== ORDER_STATE.COMMIT}
                                                                                    onChange={this.onChange.bind(this, item.order_id)}></Checkbox.CheckboxItem>
                                                                            </div>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        store.getState().role === ROLE.client ?
                                                                            <p>咨询师：{item.therapist_name}</p>
                                                                            :
                                                                            <p>用户：{item.user_name}</p>

                                                                    }
                                                                    <p>预约时间：{(item.order_date && item.order_date.split(' ')[0]) || ''}</p>
                                                                    <p>预约时段：{Util.getAppointmentPeriodStrFromArray(item.period)}</p>
                                                                    <p>房间：{item.room_name||'不使用房间'}</p>
                                                                    <p>订单费用：{item.amount}</p>
                                                                    <p>收费类型：{PAY_MANNER_DESC[this.state.appointment.pay_manner]}</p>
                                                                    <p>订单状态：{ORDER_STATE_DESC[item.state]}</p>
                                                                    <WhiteSpace/>
                                                                    {
                                                                        store.getState().role === ROLE.client ?
                                                                            (
                                                                                item.state === ORDER_STATE.COMMIT ?
                                                                                    (
                                                                                        <Flex>
                                                                                            <Flex.Item>
                                                                                                <Button size={"small"}
                                                                                                        type={"ghost"}
                                                                                                        onClick={this.pay.bind(this, item)}>立即支付</Button>
                                                                                            </Flex.Item>
                                                                                            <Flex.Item>
                                                                                                <Button size={"small"}
                                                                                                        type={"warning"}
                                                                                                        onClick={this.cancel.bind(this, item)}>取消订单</Button>
                                                                                            </Flex.Item>
                                                                                        </Flex>
                                                                                    )

                                                                                    :
                                                                                    item.state === ORDER_STATE.DONE ?
                                                                                        <Flex>
                                                                                            <Flex.Item>
                                                                                                <Button size={"small"}
                                                                                                        type={"ghost"}
                                                                                                        onClick={this.showFeedback.bind(this, item)}>咨询效果反馈</Button>
                                                                                            </Flex.Item>
                                                                                            <Flex.Item>
                                                                                                <Button size={"small"}
                                                                                                        type={"warning"}
                                                                                                        onClick={this.showComplain.bind(this, item)}>投诉咨询师</Button>
                                                                                            </Flex.Item>
                                                                                        </Flex>
                                                                                        :
                                                                                        null
                                                                            )
                                                                            :
                                                                            (null)

                                                                    }

                                                                </Card.Body>
                                                            </Card>
                                                        )
                                                    })

                                                }
                                                {
                                                    (this.state.appointment.pay_manner === PAY_MANNER.AFTER_MONTH && store.getState().role === ROLE.client && this.state.appointment.state===APPOINTMENT_STATE.AUDITED) ?
                                                        <React.Fragment>
                                                            <WhiteSpace/>
                                                            <Flex>
                                                                <Flex.Item>
                                                                    <Button size={"small"} type={"ghost"}
                                                                            onClick={this.allPay}>批量支付</Button>
                                                                </Flex.Item>
                                                            </Flex>
                                                        </React.Fragment>
                                                        :
                                                        null
                                                }

                                            </React.Fragment>
                                        )

                                    }

                                </Card.Body>
                            </Card>
                        </section>
                        :
                        <ActivityIndicator toast text={"Loading..."}/>
                }
            </div>
        );
    }
}

export default Index;