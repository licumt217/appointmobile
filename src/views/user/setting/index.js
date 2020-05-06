import React, {Component} from 'react';


import Util from '../../../assets/js/Util'

import {Accordion, Card, Flex, Button, InputItem, Picker, WhiteSpace,WingBlank} from 'antd-mobile';

import {getEmergencyContackList,deleteEmergencyContack} from '../../../http/service'


class Index extends Component {

    constructor() {
        super();

        this.state={
            emergency_list:[{
                name:'fslfs'
            }]
        }

        this.getList()
    }



    getList=()=> {
        getEmergencyContackList().then((data) => {

            this.setState({
                emergency_list:data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }

    deleteEmergencyPerson=(person)=> {

        Util.confirm({
            msg:'您确定删除吗？',
            onConfirm:()=>{
                deleteEmergencyContack({
                    emergency_contack_id: person.emergency_contack_id
                }).then((data) => {
                    Util.success("操作成功！")
                    this.getList();

                }).catch(err => {
                    Util.fail(err)
                })
            }
        })

    }

    addOrUpdateEmergency=(item)=>{
        this.props.history.push({
            pathname:'/user/setting/emergencyPerson',
            state:{item}
        })
    }


    render() {
        return (
            <WingBlank>
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="紧急联系人设置">
                        {
                            this.state.emergency_list.map((item,index)=>{
                                return (
                                    <React.Fragment key={index}>
                                        <WhiteSpace/>
                                        <Card>
                                            <Card.Body>
                                                <p>姓名：{item.name}</p>
                                                <p>关系：{item.relation}</p>
                                                <p>手机号：{item.phone}</p>
                                                <p>电子邮件：{item.email}</p>
                                                <WhiteSpace/>
                                                <Flex>
                                                    <Flex.Item>
                                                        <Button size={"small"} type={"warning"} onClick={this.deleteEmergencyPerson.bind(this,item)}>删除联系人</Button>
                                                    </Flex.Item>
                                                    <Flex.Item>
                                                        <Button size={"small"} type={"ghost"} onClick={this.addOrUpdateEmergency.bind(this,item)}>修改联系人</Button>
                                                    </Flex.Item>
                                                </Flex>
                                                <Flex>
                                                    <Flex.Item>
                                                        <WhiteSpace/>
                                                        <Button size={"small"} type={"ghost"} onClick={this.addOrUpdateEmergency.bind(this,null)}>添加联系人</Button>
                                                    </Flex.Item>
                                                </Flex>
                                            </Card.Body>

                                        </Card>

                                    </React.Fragment>

                                )
                            })
                        }
                    </Accordion.Panel>
                    <Accordion.Panel header="其它设置" className="pad">
                        text text text text text text text text text text text text text text text
                    </Accordion.Panel>
                </Accordion>
            </WingBlank>
        );
    }
}

export default Index;