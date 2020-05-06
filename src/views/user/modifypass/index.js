import React, {Component} from 'react';

import {Button, List, InputItem, Flex, WingBlank,WhiteSpace} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {updatePassword} from '../../../http/service'

class Index extends Component {

    constructor(props) {
        super(props);


        this.state = {
            form: {}
        }
    }

    handleFormChange = (type, value) => {
        let form = this.state.form;
        form[type] = value;


        this.setState({
            form
        })
    }

    isValid=()=> {

        if (!(this.state.form.password)) {
            Util.info('请输入原始密码')
            return false;
        }

        if (!(this.state.form.newPassword)) {
            Util.info('请输入新密码')
            return false;
        }

        if (!(this.state.form.confirmPassword)) {
            Util.info('请输入确认新密码')
            return false;
        }

        return true;


    }

    update=()=> {
        if (this.isValid()) {

            //新密码和原始密码不能相同
            if (this.state.form.password === this.state.form.newPassword) {
                Util.info('新密码不能和原始密码相同')
                return;
            }

            //新密码和确认密码必须相同

            if (this.state.form.newPassword !== this.state.form.confirmPassword) {
                Util.info('新密码和确认密码不相同')
                return;
            }


            updatePassword({
                password: this.state.form.password,
                newPassword: this.state.form.newPassword,
                confirmPassword: this.state.form.confirmPassword,
            }).then(() => {
                Util.success('密码修改成功，请重新登录')
                // this.$store.commit("isLogin", false)
                this.props.history.push('/user/register')
            }).catch(err => {
                Util.fail(err)

            })

        }
    }

    render() {
        return (
            <div>
                <List>
                    <List.Item>
                        <h3>修改密码</h3>
                    </List.Item>
                </List>
                <WingBlank>
                    <List>
                        <InputItem value={this.state.form.password} type={"password"}
                                   onChange={this.handleFormChange.bind(this, 'password')}>原始密码</InputItem>
                        <InputItem value={this.state.form.newPassword} type={"password"}
                                   onChange={this.handleFormChange.bind(this, 'newPassword')}>新密码</InputItem>
                        <InputItem value={this.state.form.confirmPassword} type={"password"}
                                   onChange={this.handleFormChange.bind(this, 'confirmPassword')}>确认新密码</InputItem>
                    </List>
                    <WhiteSpace/>

                    <Flex>
                        <Flex.Item>
                            <Button size={"small"} onClick={Util.back}>返回</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button size={"small"} type={"ghost"} onClick={this.update}>修改</Button>
                        </Flex.Item>
                    </Flex>
                </WingBlank>

            </div>
        );
    }
}

export default Index;