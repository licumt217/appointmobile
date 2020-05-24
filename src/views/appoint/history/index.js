import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getAppointmentHistoryByUserId} from '../../../http/service'
import ORDER_STATE from "../../../assets/js/constants/ORDER_STATE";
import ORDER_STATE_DESC from "../../../assets/js/constants/ORDER_STATE_DESC";


class Index extends Component {

    constructor() {
        super();
        this.state = {
            appointments: [],

        }
        //
        this.getAppointmentHistoryByUserId();
    }

    /**
     * */
    getAppointmentHistoryByUserId = () => {
        getAppointmentHistoryByUserId().then((data) => {

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

    render() {
        return (
            <div>
                <section>
                    <Card>
                        <Card.Header
                            title="预约历史"
                        />
                        <Card.Body>
                            {this.state.appointments.length === 0 ?
                                <div className='center'>
                                    暂无数据
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
                                                    <p>预约类型：{appointment.ismulti===1?'持续预约':'单次预约'}</p>
                                                    <p>预约状态：{ORDER_STATE_DESC[appointment.state]}</p>
                                                    <p>创建时间：{appointment.create_date}</p>
                                                    {
                                                        appointment.state===ORDER_STATE.DONE?
                                                            <React.Fragment>
                                                                <WhiteSpace/>
                                                                <Flex justify={"around"} align={"center"} alignContent={"center"}>
                                                                    <Flex.Item style={{textAlign:'center'}}><Button type="ghost" size={"small"}
                                                                                                                    onClick={this.go2OrderList.bind(this,appointment)}>订单记录</Button></Flex.Item>

                                                                </Flex>
                                                            </React.Fragment>
                                                            :
                                                            null
                                                    }

                                                </Card.Body>
                                            </Card>
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