import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getOrdersByAppointmentId,pay} from '../../../http/service'
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import PayUtil from "../../../assets/js/PayUtil";


class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment_id=this.props.location.state.appointment_id
        this.state = {
            orders: [],

        }
        //
        this.getOrdersByAppointmentId();
    }

    /**
     * */
    getOrdersByAppointmentId = () => {
        getOrdersByAppointmentId({
            appointment_id:this.appointment_id
        }).then((data) => {

            this.setState({
                orders: data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }


    cancel = () => {
        this.$Modal.confirm({
            title: '您确定取消吗？',
            content: '',
            onOk: () => {
                this.http.post('order/cancelOrder', {
                    order_id: this.curAppoint.order_id
                }).then((data) => {
                    this.curAppoint = data;
                    Util.success("操作成功")
                    this.init()

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
    pay = (order) => {
        pay({
            order_id: order.order_id
        }).then((data) => {

            PayUtil.pay(data.secuParam, this.getOrdersByAppointmentId, this.getOrdersByAppointmentId)

        }).catch(err => {
            Util.fail(err)
        })
    }


    render() {
        return (
            <div>
                <section>
                    <Card>
                        <Card.Header
                            title="订单记录"
                        />
                        <Card.Body>
                            {this.state.orders.length === 0 ?
                                <div className='center'>
                                    暂无订单
                                </div>
                                :
                                (
                                    this.state.orders.map((item, index) => {
                                        return (
                                            <div>
                                                <p>咨询师：{item.name}</p>
                                                <p>预约时段：{Util.getAppointPeriodStrFromArray(item)}</p>
                                                <p>订单费用：{item.amount}</p>
                                                <p>订单状态：{ORDER_STATE_DESC[item.state]}</p>
                                                <WhiteSpace/>
                                                {
                                                    item.state === ORDER_STATE.AUDITED ?
                                                        <Flex>
                                                            <Flex.Item>
                                                                <Button size={"small"} type={"ghost"} onClick={this.pay.bind(this,item)}>立即支付</Button>
                                                            </Flex.Item>
                                                        </Flex>
                                                        :
                                                        item.state === ORDER_STATE.DONE ?
                                                            <Flex>
                                                                <Flex.Item>
                                                                    <Button onClick={this.showFeedbackModal}>咨询效果反馈</Button>
                                                                </Flex.Item>
                                                                <Flex.Item>
                                                                    <Button onClick={this.showComplainModal}>投诉咨询师</Button>
                                                                </Flex.Item>
                                                            </Flex>
                                                            :
                                                            // order.state===ORDER_STATE.COMMIT || order.state===ORDER_STATE.AUDITED || order.state===ORDER_STATE.PAYED
                                                            <Flex>
                                                                <Flex.Item>
                                                                    {/*<Button onClick={this.cancel}>取消预约</Button>*/}
                                                                </Flex.Item>
                                                            </Flex>
                                                }
                                                <br/>
                                            </div>
                                        )
                                    })
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