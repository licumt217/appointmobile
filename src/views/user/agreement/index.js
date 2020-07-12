import React, {Component} from 'react';

import {List, Steps, Card, Button, Flex, WhiteSpace, WingBlank} from "antd-mobile";

import Util from "../../../assets/js/Util";

import './index.less'

import {getAgreementList, acceptAgreement} from "../../../http/service";

const Step = Steps.Step;

class Index extends Component {


    constructor(props) {
        super(props);
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
                Util.success('操作成功！')
                this.props.history.goBack()
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
