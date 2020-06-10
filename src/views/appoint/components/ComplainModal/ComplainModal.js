import React, {Component} from 'react';

import {Button, Flex, TextareaItem, Card} from "antd-mobile";

import Util from "../../../../assets/js/Util";

import {addComplaint} from '../../../../http/service'

import './index.less'
import store from "../../../../store";
import ROLE from "../../../../assets/js/constants/ROLE";

class ComplainModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            content: '',
            show: this.props.show
        }
        this.user_type = this.props.user_type;


    }

    getTitle = () => {
        return this.user_type === 'therapist' ? '投诉用户' : '投诉咨询师';
    }

    confirm = () => {
        if (this.state.content) {

            addComplaint({
                content: this.state.content,
                order_id: this.props.order_id,
            }).then((data) => {
                Util.success("投诉成功")

                this.props.onHide()
            }).catch(err => {
                Util.fail(err)
            })


        } else {
            Util.info("请输入投诉内容")
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
                                                placeholder="请输入投诉内容"
                                            />
                                            <Flex>
                                                <Flex.Item>
                                                    <Button size={"small"} onClick={this.props.onCancel}>取消</Button>
                                                </Flex.Item>
                                                <Flex.Item>
                                                    <Button size={"small"} type={"warning"}
                                                            onClick={this.confirm}>投诉</Button>
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

export default ComplainModal;