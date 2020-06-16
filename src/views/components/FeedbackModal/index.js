import React, {Component} from 'react';

import {Button, Flex, TextareaItem, Card} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {addFeedback,getFeedbackByOrderId} from '../../../http/service'

import './index.less'

class Feedback extends Component {


    constructor(props) {
        super(props);

        this.state = {
            content: '',
            show: true
        }
    }

    componentDidMount() {
        getFeedbackByOrderId({
            order_id: this.props.order_id,
        }).then((data) => {
            if(data){
                this.setState({
                    content:data.content
                })
            }
        }).catch(err => {
            Util.fail(err)
        })
    }

    confirm = () => {
        if (this.state.content) {

            addFeedback({
                content: this.state.content,
                order_id: this.props.order_id,
            }).then((data) => {
                Util.success("反馈成功")

                this.props.onHide()
            }).catch(err => {
                Util.fail(err)
            })


        } else {
            Util.info("请输入反馈内容")
        }
    }

    handleChange = (e) => {
        this.setState({
            content: e
        })
    }

    hide = () => {
        this.setState({
            show:false,
            content:''
        })
        this.props.onHide();
    }


    render() {
        this.title = null;
        return (
            <React.Fragment>
                {
                    this.state.show ?
                        (
                            <React.Fragment>
                                <div className='mask' onTouchEnd={this.hide}>

                                </div>
                                <div className='content'>
                                    <Card>
                                        <Card.Body>
                                            <TextareaItem
                                                rows={5}
                                                title=""
                                                value={this.state.content}
                                                onChange={this.handleChange}
                                                placeholder="请输入咨询反馈"
                                            />
                                            <Flex>
                                                <Flex.Item>
                                                    <Button size={"small"} onClick={this.props.onHide}>取消</Button>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Button size={"small"} type={"warning"}
                                                            onClick={this.confirm}>确定</Button>
                                                </Flex.Item>
                                            </Flex>
                                        </Card.Body>
                                    </Card>

                                </div>
                            </React.Fragment>
                        )
                        :
                        (
                            null
                        )
                }
            </React.Fragment>
        );
    }
}

export default Feedback;