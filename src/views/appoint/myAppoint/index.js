import React, {Component} from 'react';

import {Button, Card, Flex,WhiteSpace,WingBlank} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getCurAppoint} from '../../../http/service'




class Index extends Component {

    constructor() {
        super();
        this.state={
            curAppoint:{},

        }

        this.getCurAppoint();
    }

    /**
     * 获取当前预约
     * */
    getCurAppoint=()=>{
        getCurAppoint().then((data) => {

            this.setState({
                curAppoint:data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }

    go2Detail=(order)=>{
        this.props.history.push({
            pathname:'/appoint/detail',
            order_id:order.order_id
        })

    }

    cancel=()=>{
        this.$Modal.confirm({
            title: '您确定取消吗？',
            content: '',
            onOk: () => {
                this.http.post('order/cancelOrder', {
                    order_id:this.curAppoint.order_id
                }).then((data) => {
                    this.curAppoint=data;
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

    appoint=()=>{
        if(this.curAppoint){
            Util.info("您有进行中的预约！")
            return;
        }
        this.props.history.push({
            pathname:'/therapist/search',
        })
    }

    emergencyConsult=()=>{
        this.props.history.push({
            pathname:'/therapistList',
            isEmergency:true
        })
    }
    /**
     * 转介
     */
    transfer=()=>{

        this.props.history.push({
            pathname:'/therapistListWithTransfer',
        })
    }


    render() {
        return (
            <div>
                <section >
                    <Card>
                        <Card.Header
                            title="当前预约"
                        />
                        <Card.Body>
                            {this.state.curAppoint===null?
                                <div className='center'>
                                    暂无预约
                                </div>
                                :
                                <div>
                                    <p>预约日期：{this.state.curAppoint.appoint_date}</p>
                                    <p>预约时段：{Util.getAppointPeriodStrFromArray(this.state.curAppoint)}</p>
                                    <p>咨询师：{this.state.curAppoint.name}</p>
                                    <Flex>
                                        <Flex.Item><Button type="primary" size={"small"} onClick={this.go2Detail}>查看详情</Button></Flex.Item>
                                        <Flex.Item><Button type="warning" size={"small"} onClick={this.cancel}>取消预约</Button></Flex.Item>
                                    </Flex>
                                </div>
                            }

                            <WhiteSpace size={"xl"}/>
                            <Flex>
                                <Flex.Item><Button type="primary" size={"small"} onClick={this.appoint}>立即预约</Button></Flex.Item>
                                <Flex.Item><Button type="warning" size={"small"} onClick={this.emergencyConsult}>紧急咨询</Button></Flex.Item>
                                <Flex.Item><Button type="ghost" size={"small"} onClick={this.transfer}>转介</Button></Flex.Item>
                            </Flex>

                        </Card.Body>
                    </Card>
                </section>
            </div>
        );
    }
}

export default Index;