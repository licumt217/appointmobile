import React, {Component} from 'react';

import {List, Steps, Card, Button, Flex, WhiteSpace, WingBlank} from "antd-mobile";

import Util from "../../../assets/js/Util";

import './index.less'

import {getAgreementList, acceptAgreement, getMeasureList} from "../../../http/service";

const Step = Steps.Step;

class Index extends Component {


    constructor(props) {
        super(props);
        this.division_id=this.props.location.state.division_id;
        this.therapist_id=this.props.location.state.therapist_id;
        this.station_id=this.props.location.state.station_id;
        this.state = {
            agreements: [],
            current: 0
        }

    }

    componentDidMount() {

        getAgreementList().then(data => {
            if (data && data.length > 0) {
                this.setState({
                    agreements: data
                })
            }
        }).catch(err => {
            Util.fail(err)
        });
    }

    nextStep = () => {
        if (this.state.current < this.state.agreements.length - 1) {
            this.setState({
                current: this.state.current + 1
            })
        } else {
            acceptAgreement().then(data => {
                //判断是否回答过该咨询师对应分部的预检表，回答过的话直接到选日期页面；否则回答预检表
                getMeasureList({
                    organization_id:this.division_id
                }).then(data=>{

                    if(data.status===1){//已回答过
                        this.props.history.push({
                            pathname: '/appoint/selectDate',
                            state:{
                                therapist_id: this.therapist_id,
                                station_id: this.station_id,
                            }
                        })
                    }else{
                        this.props.history.push({
                            pathname: '/appoint/preCheck',
                            state:{
                                division_id:this.division_id
                            }
                        })
                    }
                }).catch(err => {
                    Util.fail(err)
                });
            }).catch(err => {
                Util.fail(err)
            });

        }

    }

    prevStep = () => {
        if (this.state.current === 0) {
        } else {
            this.setState({
                current: this.state.current - 1
            })
        }

    }

    render() {
        return (
            <div>
                <List>
                    <List.Item><h3>用户协议</h3></List.Item>
                </List>
                <WhiteSpace/>

                <WingBlank>
                    <div style={{width:'100%',overflow:'hidden',paddingTop:'1em'}}>
                        <Steps size='small' current={this.state.current} direction="horizontal">
                            {
                                this.state.agreements.map((item, index) => {
                                    return <Step title={index + 1} key={index}/>
                                })
                            }
                        </Steps>
                    </div>
                    <WhiteSpace/>

                    {
                        this.state.agreements.map((item, index) => {
                            return (
                                <React.Fragment key={index}>

                                    {
                                        (index === this.state.current) ?
                                            <Card>
                                                <Card.Header title={'协议' + (index + 1)}/>
                                                <Card.Body>
                                                    {item.content}
                                                </Card.Body>
                                            </Card>

                                            :
                                            null
                                    }
                                </React.Fragment>

                            )
                        })
                    }

                    <WhiteSpace/>
                    <Flex>
                        <Flex.Item>
                            <Button type={"ghost"} size={"small"} onClick={this.prevStep}>上一步</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button type={"primary"} size={"small"} onClick={this.nextStep}>同意</Button>
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace/>
                </WingBlank>

            </div>
        );
    }
}

export default Index;
