import React, {Component} from 'react';

import {Button, Flex, TextareaItem} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {addComplaint} from '../../../http/service'

class FeedbackModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            content:''
        }


    }

    confirm=()=>{
        if (this.state.content) {

            //TODO 反馈接口。弹窗时是否需要回显？

            Util.success("反馈成功")
            this.props.onSave();

        } else {
            Util.info("请输入反馈内容")
        }
    }

    handleChange=(e)=>{
        this.setState({
            content:e
        })
    }


    render() {
        this.title = null;
        return (
            <React.Fragment>
                <TextareaItem
                    rows={5}
                    title=""
                    value={this.state.content}
                    onChange={this.handleChange}
                    placeholder="请输入反馈内容"
                />
                <Flex>
                    <Flex.Item>
                        <Button size={"small"}  onClick={this.props.onCancel}>取消</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button size={"small"} type={"warning"} onClick={this.confirm}>确定</Button>
                    </Flex.Item>
                </Flex>
            </React.Fragment>
        );
    }
}

export default FeedbackModal;