import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, Modal} from 'antd-mobile'

import Util from '../../../assets/js/Util'
import PayUtil from '../../../assets/js/PayUtil'

import {getAppointDetail, pay, cancelOrder} from '../../../http/service'

import ComplainModal from "../components/ComplainModal/ComplainModal";
import FeedbackModal from "../components/FeedbackModal";

const ORDER_STATE_DESC = require('../../../assets/js/constants/ORDER_STATE_DESC')
const ORDER_STATE = require('../../../assets/js/constants/ORDER_STATE')


class Index extends Component {

    constructor(props) {
        super(props);

        this.order_id = this.props.location.order_id

        this.state = {
            order: {},
            modal: false,
            isShowComplain: false,
            isShowFeedback: false,
        }

        this.getAppointDetail()

    }


    getAppointDetail = () => {

        getAppointDetail({order_id: this.order_id}).then((data) => {

            this.setState({
                order: data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }


    pay = () => {
        pay({
            order_id: this.order_id
        }).then((data) => {

            PayUtil.pay(data.secuParam, this.getAppointDetail, this.getAppointDetail)

        }).catch(err => {
            Util.fail(err)
        })
    }

    /**
     * 24小时内能取消（已支付的直接退款
     * 24小时外不能退款）
     */
    cancel = () => {

        Util.confirm({
            msg: '您确定取消吗?',
            onCancel() {
            },
            onConfirm: () => {
                cancelOrder({
                    order_id: this.order_id
                }).then(() => {
                    Util.success("操作成功")
                    this.getAppointDetail()

                }).catch(err => {
                    Util.fail(err)
                })
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
        this.getAppointDetail();
    }

    showFeedbackModal = () => {
        this.setState({
            isShowFeedback: true
        })
    }

    hideFeedbackModal = () => {
        this.setState({
            isShowFeedback: false
        })
    }

    handleAfterFeedback = () => {
        this.hideFeedbackModal();
        this.getAppointDetail();
    }


    render() {
        return (
            <div>


                <Card>
                    <Card.Header>预约详情</Card.Header>
                    <Card.Body>
                        <p>预约日期：{this.state.order.appoint_date}</p>
                        <p>预约时段：{Util.getAppointPeriodStrFromArray(this.state.order)}</p>
                        <p>咨询师：{this.state.order.name}</p>
                        <p>订单状态：{ORDER_STATE_DESC[this.state.order.state]}</p>
                    </Card.Body>
                </Card>

                {
                    this.state.order.state === ORDER_STATE.AUDITED ?
                        <Flex>
                            <Flex.Item>
                                <Button onClick={this.pay}>立即支付</Button>
                            </Flex.Item>
                        </Flex>
                        :
                        this.state.order.state === ORDER_STATE.DONE ?
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
                                    <Button onClick={this.cancel}>取消预约</Button>
                                </Flex.Item>
                                <Flex.Item>
                                    <Button onClick={this.showFeedbackModal}>反馈</Button>
                                </Flex.Item>
                            </Flex>
                }

                {
                    this.state.isShowComplain ? <ComplainModal user_type={'therapist'}
                                                               order_id={this.state.order.order_id}
                                                               onCancel={this.hideComplainModal}
                                                               onSave={this.handleAfterComplain}/> : null
                }

                {
                    this.state.isShowFeedback ? <FeedbackModal
                        order_id={this.state.order.order_id}
                        onCancel={this.hideFeedbackModal}
                        onSave={this.handleAfterFeedback}/> : null
                }


            </div>
        );
    }
}

export default Index;