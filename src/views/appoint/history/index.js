import React, {Component} from 'react';

import {Button, Card, List, WhiteSpace} from 'antd-mobile'

import Util from '../../../assets/js/Util'

import {getAppointHistory} from '../../../http/service'

const ORDER_STATE_DESC = require('../../../assets/js/constants/ORDER_STATE_DESC')


class Index extends Component {

    constructor() {
        super();
        this.state = {
            response:{
                data:[]
            }
        }

        this.getAppointList(1)
    }

    getAppointList=(page,isLoadMore=false)=>{
        getAppointHistory({
            pageSize:Util.pageSize,
            page
        }).then((response) => {

            if(isLoadMore){

                let {data}=this.state.data;

                data=data.concat(response.data)

                response.data=data;
                this.setState({
                    response
                })

            }else{
                this.setState({response})
            }


        }).catch(err => {
            Util.fail(err)
        })
    }

    go2Detail=(order)=> {

        this.props.history.push({
            pathname:'/appoint/detail',
            order_id:order.order_id
        })
    }
    loadMore=()=>{
        this.getAppointList(this.state.response.currentPage+1,true)
    }



    render() {
        return (
            <div>
                {
                    this.state.response.data.length === 0 ?
                        <List>
                            <List.Item><h3>暂无数据</h3></List.Item>
                        </List>
                        :

                        <div>
                            <p>预约记录</p>

                            {
                                this.state.response.data.map(item => {
                                    return (
                                        <Card>

                                            <p>咨询师：{item.name}</p>
                                            <p>预约日期：{item.therapist_period.appoint_date}</p>
                                            <p>预约时段：{Util.getAppointPeriodStrFromArray(item.therapist_period)}</p>
                                            <p>预约状态：{ORDER_STATE_DESC[item.state]}</p>
                                            <div>
                                                <Button onClick={this.go2Detail(item)}>查看详情</Button>
                                            </div>
                                        </Card>
                                    )
                                })
                            }

                            {
                                this.state.response.totalPages>this.state.response.currentPage?
                                    <span onClick={this.loadMore}>加载更多</span>
                                    :
                                    <React.Fragment/>

                            }




                        </div>


                }
            </div>
        );
    }
}

export default Index;