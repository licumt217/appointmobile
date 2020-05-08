import React, {Component} from 'react';

import {Button, Card, List, WhiteSpace,WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getAppointmentListByUserId} from '../../../http/service'

import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";


class Index extends Component {

    constructor() {
        super();
        this.state = {
            list: []
        }

        this.getAppointmentListByUserId(1)
    }

    getAppointmentListByUserId = (page) => {
        getAppointmentListByUserId({}).then((data) => {

            this.setState({
                list: data
            })


        }).catch(err => {
            Util.fail(err)
        })
    }

    go2Detail = (order) => {

        this.props.history.push({
            pathname: '/appoint/detail',
            order_id: order.order_id
        })
    }
    loadMore = () => {
        this.getAppointList(this.state.response.currentPage + 1, true)
    }


    render() {
        return (
            <div>
                {
                    this.state.list.length === 0 ?
                        <List.Item><h3>暂无数据</h3></List.Item>
                        :

                        <div>
                            <List.Item><h3>预约记录</h3></List.Item>

                            {
                                this.state.list.map((item, index) => {
                                    return (
                                        <WingBlank key={index}>
                                            <WhiteSpace/>
                                            <Card >

                                                <Card.Body>
                                                    <p>咨询师：{item.therapist_name}</p>
                                                    <p>操作日期：{item.op_date.split(' ')[0]}</p>
                                                    <p>预约开始日期：{item.appoint_date.split(' ')[0]}</p>
                                                    <p>预约类型：{item.ismulti===0?'单次':'持续'}</p>
                                                    <p>预约时段：{Util.getAppointPeriodStrFromArray(item)}</p>
                                                    <p>预约状态：{ORDER_STATE_DESC[item.state]}</p>
                                                    <WhiteSpace/>
                                                    <div>
                                                        <Button type={"ghost"} onClick={this.go2Detail}>订单记录</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </WingBlank>
                                    )
                                })
                            }


                        </div>


                }
            </div>
        );
    }
}

export default Index;