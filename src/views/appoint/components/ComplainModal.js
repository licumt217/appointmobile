import React, {Component} from 'react';

import {Button, Flex, TextareaItem} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {addComplaint} from '../../../http/service'

class ComplainModal extends Component {


    constructor(props) {
        super(props);

        this.state = {
            content:''
        }
        this.user_type = this.props.user_type;


    }

    getTitle = () => {
        return this.user_type === 'therapist' ? '投诉用户' : '投诉咨询师';
    }

    confirm=()=>{
        if (this.state.content) {

            addComplaint( {
                content: this.state.content,
                user_type: this.props.user_type,
                order_id: this.props.order_id,
            }).then((data) => {
                Util.success("投诉成功")
                this.props.onSave();

            }).catch(err => {
                Util.fail(err)
            })


        } else {
            Util.info("请输入投诉内容")
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
                    placeholder="请输入投诉内容"
                />
                <Flex>
                    <Flex.Item>
                        <Button size={"small"}  onClick={this.props.onCancel}>取消</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button size={"small"} type={"warning"} onClick={this.confirm}>投诉</Button>
                    </Flex.Item>
                </Flex>
            </React.Fragment>
        );
    }
}

export default ComplainModal;