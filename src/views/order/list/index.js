import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank, Checkbox} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getOrdersByAppointmentId, pay, getAppointmentDetail,batchPay} from '../../../http/service'
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import FEE_TYPE from "../../../assets/js/constants/FEE_TYPE";
import FEE_TYPE_DESC from "../../../assets/js/constants/FEE_TYPE_DESC";
import PayUtil from "../../../assets/js/PayUtil";
import ComplainModal from "../../appoint/components/ComplainModal/ComplainModal";
import './index.less'

class Index extends Component {

    constructor(props) {
        super(props);

        this.appointment_id = this.props.location.state.appointment_id
        this.orderIdSet = new Set();
        this.state = {
            orders: [],
            isShowComplain: false,
            order_id: '',
            appointment: {}

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

    onChange = (order_id) => {
        if (this.orderIdSet.has(order_id)) {
            this.orderIdSet.delete(order_id)
        } else {
            this.orderIdSet.add(order_id)
        }

    }

    allPay = () => {
        if(this.orderIdSet.size>0){
            console.log(this.orderIdSet)
            batchPay({
                order_id_array: [...this.orderIdSet]
            }).then((data) => {

                PayUtil.pay(data.secuParam, this.getOrdersByAppointmentId, this.getOrdersByAppointmentId)

            }).catch(err => {
                Util.fail(err)
            })
        }else{
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
                                    <React.Fragment>
                                        {
                                            this.state.orders.map((item, index) => {
                                                return (
                                                    <Card key={index}>
                                                        <Card.Body>
                                                            {
                                                                this.state.appointment.fee_type===FEE_TYPE.AFTER_MONTH?
                                                                    <div className='checkbox-right-top'>
                                                                        <Checkbox.CheckboxItem
                                                                            disabled={item.state !== ORDER_STATE.COMMIT}
                                                                            onChange={this.onChange.bind(this, item.order_id)}></Checkbox.CheckboxItem>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                            <p>咨询师：{item.therapist_name}</p>
                                                            <p>预约时间：{(item.order_date && item.order_date.split(' ')[0]) || ''}</p>
                                                            <p>预约时段：{Util.getAppointPeriodStrFromArray(item)}</p>
                                                            <p>订单费用：{item.amount}</p>
                                                            <p>收费类型：{FEE_TYPE_DESC[this.state.appointment.fee_type]}</p>
                                                            <p>订单状态：{ORDER_STATE_DESC[item.state]}</p>
                                                            <WhiteSpace/>
                                                            {
                                                                item.state === ORDER_STATE.COMMIT ?
                                                                    (
                                                                        <Flex>
                                                                            <Flex.Item>
                                                                                <Button size={"small"} type={"ghost"}
                                                                                        onClick={this.pay.bind(this, item)}>立即支付</Button>
                                                                            </Flex.Item>
                                                                        </Flex>
                                                                    )

                                                                    :
                                                                    item.state === ORDER_STATE.DONE ?
                                                                        <Flex>
                                                                            <Flex.Item>
                                                                                <Button size={"small"} type={"ghost"}
                                                                                        onClick={this.showFeedbackModal}>咨询效果反馈</Button>
                                                                            </Flex.Item>
                                                                            <Flex.Item>
                                                                                <Button size={"small"} type={"ghost"}
                                                                                        onClick={this.showComplain.bind(this, item)}>投诉咨询师</Button>
                                                                            </Flex.Item>
                                                                        </Flex>
                                                                        :
                                                                        <Flex>
                                                                            <Flex.Item>
                                                                                {/*<Button onClick={this.cancel}>取消预约</Button>*/}
                                                                            </Flex.Item>
                                                                        </Flex>
                                                            }


                                                        </Card.Body>
                                                    </Card>
                                                )
                                            })
                                        }
                                        {
                                            this.state.appointment.fee_type === FEE_TYPE.AFTER_MONTH ?
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
            </div>
        );
    }
}

export default Index;