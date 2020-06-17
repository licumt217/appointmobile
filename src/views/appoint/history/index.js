import React, {Component} from 'react';

import {Button, Card, Flex, WhiteSpace, WingBlank,Pagination} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getAppointmentHistoryByUserId, getAppointmentHistoryByTherapistId} from '../../../http/service'
import APPOINTMENT_STATE from "../../../assets/js/constants/APPOINTMENT_STATE";
import APPOINTMENT_STATE_DESC from "../../../assets/js/constants/APPOINTMENT_STATE_DESC";
import APPOINTMENT_MULTI from "../../../assets/js/constants/APPOINTMENT_MULTI";
import ROLE from "../../../assets/js/constants/ROLE";
import store from "../../../store";


class Index extends Component {

    constructor() {
        super();
        this.state = {
            data:{
                data:[]
            }

        }
        this.getList();

    }

    getList=(page=1)=>{
        if (store.getState().role === ROLE.client) {
            this.getAppointmentHistoryByUserId(page);
        } else if (store.getState().role === ROLE.therapist) {
            this.getAppointmentHistoryByTherapistId(page)
        }
    }

    /**
     * */
    getAppointmentHistoryByTherapistId = (page) => {
        getAppointmentHistoryByTherapistId({
            page,
            pageSize:Util.pageSize
        }).then((data) => {

            this.setState({
                data: data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }

    /**
     * */
    getAppointmentHistoryByUserId = (page) => {
        getAppointmentHistoryByUserId({
            page,
            pageSize:Util.pageSize
        }).then((data) => {

            this.setState({
                data: data
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

    render() {
        return (
            <div>
                <section>
                    <Card>
                        <Card.Header
                            title="预约历史"
                        />
                        <Card.Body>
                            {this.state.data.data.length === 0 ?
                                <div className='center' style={{marginTop:".8em"}}>
                                    暂无数据
                                </div>
                                :
                                (
                                    <React.Fragment>
                                        {
                                            this.state.data.data.map((appointment, index) => {
                                                return (
                                                    <Card key={index} style={{marginBottom: '.5em'}}>
                                                        <Card.Body>
                                                            {
                                                                store.getState().role === ROLE.client ?
                                                                    <p>咨询师：{appointment.therapist_name}</p>
                                                                    :
                                                                    <p>用户：{appointment.user_name}</p>

                                                            }
                                                            <p>预约开始日期：{appointment.appoint_date.split(" ")[0]}</p>
                                                            <p>预约时段：{Util.getAppointmentPeriodStrFromArray(appointment.period)}</p>
                                                            <p>房间：{appointment.room_name}</p>
                                                            <p>预约类型：{appointment.ismulti === APPOINTMENT_MULTI.CONTINUE ? '持续预约' : '单次预约'}</p>
                                                            <p>预约状态：{APPOINTMENT_STATE_DESC[appointment.state]}</p>
                                                            <p>创建时间：{appointment.create_date}</p>
                                                            {
                                                                appointment.state === APPOINTMENT_STATE.DONE ?
                                                                    <React.Fragment>
                                                                        <WhiteSpace/>
                                                                        <Flex justify={"around"} align={"center"}
                                                                              alignContent={"center"}>
                                                                            <Flex.Item style={{textAlign: 'center'}}><Button
                                                                                type="ghost" size={"small"}
                                                                                onClick={this.go2OrderList.bind(this, appointment)}>订单记录</Button></Flex.Item>

                                                                        </Flex>
                                                                    </React.Fragment>
                                                                    :
                                                                    null
                                                            }

                                                        </Card.Body>
                                                    </Card>
                                                )
                                            })
                                        }
                                        {
                                            this.state.data.totalPages>1?
                                                <Pagination total={this.state.data.totalPages} current={this.state.data.currentPage}  onChange={this.getList}/>
                                                :null
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