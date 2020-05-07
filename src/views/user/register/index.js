import React, {Component} from 'react';

import Util from '../../../assets/js/Util'

import {Tabs, WhiteSpace, SegmentedControl, List, InputItem, Picker, DatePicker, Button, WingBlank} from 'antd-mobile';
import {bindUser, registerAndBind} from '../../../http/service'


class Index extends Component {

    constructor() {
        super();
        this.state = {
            tabIndex: 0,
            form: {
                phone: '',
                identification_no: '',
                name: '',
                gender: 'male',
                email: '',
                birthday: '',
                openid: sessionStorage.openid
            },
            loginForm: {
                phone: '',
                password: '',
                openid: sessionStorage.openid
            }
        }
    }

    isValid = () => {
        if (!(this.state.form.phone && Util.isValidPhone(this.state.form.phone))) {
            Util.info('请输入正确的手机号')
            return false;
        }

        if (!(this.state.form.identification_no && Util.isValidID(this.state.form.identification_no))) {
            Util.info('请输入正确身份证号')
            return false;
        }

        if (!(this.state.form.name)) {
            Util.info('请输入姓名')
            return false;
        }
        if (!(this.state.form.gender)) {
            Util.info('请选择性别')
            return false;
        }

        if (!(this.state.form.email && Util.isValidEmail(this.state.form.email))) {
            Util.info('请输入正确的电子邮箱')
            return false;
        }

        if (!(this.state.form.birthday)) {
            Util.info('请选择出生日期')
            return false;
        }

        return true;
    }

    register = () => {


        if (this.isValid()) {
            // this.$router.push('/appoint/myAppoint')
            // return;

            registerAndBind(this.state.form).then((data) => {

                Util.success("注册成功")

                sessionStorage.user_id = data.userInfo.user_id;
                sessionStorage.token = data.token;

                //TODO 入口是哪个菜单，注册后需要跳转到具体菜单。

                this.$router.push('/appoint/myAppoint')

            }).catch(err => {
                Util.fail(err)
            })
        }


    }

    isValidWhenLogin = () => {
        if (!(this.state.loginForm.phone && Util.isValidPhone(this.state.loginForm.phone))) {
            Util.info('请输入正确的手机号')
            return false;
        }

        if (!(this.state.loginForm.password)) {
            Util.info('请输入密码')
            return false;
        }


        return true;
    }
    /**
     * 已在pc端注册过的咨询师登录，进行账号关联
     */
    login = () => {
        if (this.isValidWhenLogin()) {

            bindUser(this.state.loginForm).then((data) => {

                Util.success('登录成功')

                sessionStorage.user_id = data.userInfo.user_id;
                sessionStorage.token = data.token;

                this.$router.push('/appoint/myAppoint')

            }).catch(err => {
                Util.fail(err)
            })

        }

    }


    handleFormChange = (type, value) => {
        let form = this.state.form;
        if (type === 'gender' && value.length > 0) {
            form[type] = value[0];
        } else {
            form[type] = value;
        }


        this.setState({
            form
        })
    }

    handleTherapistFormChange = (type, value) => {
        let loginForm = this.state.loginForm;
        loginForm[type] = value;
        this.setState({
            loginForm
        })
    }


    render() {

        const tabs = [
            {title: '用户注册'},
            {title: '咨询师登录'},
        ];

        return (
            <div>
                <SegmentedControl values={['用户注册', '咨询师登录']}
                                  style={{height: '32px', width: '90vw', margin: '10px auto'}} onChange={(e) => {
                    this.setState({tabIndex: e.nativeEvent.selectedSegmentIndex})
                }}/>


                <WingBlank>
                    {
                        this.state.tabIndex === 0 ?
                            (
                                <List>

                                    <InputItem value={this.state.form.phone} type={"phone"} placeholder={'请输入手机号'}
                                               onChange={this.handleFormChange.bind(this, 'phone')}>手机号</InputItem>

                                    <InputItem value={this.state.form.identification_no} placeholder={'请输入身份证号'}
                                               onChange={this.handleFormChange.bind(this, 'identification_no')}>身份证号</InputItem>

                                    <InputItem value={this.state.form.name} placeholder={'请输入姓名'}
                                               onChange={this.handleFormChange.bind(this, 'name')}>姓名</InputItem>

                                    <Picker data={Util.genderOptions} cols={1}
                                            extra="请选择性别"
                                            value={[this.state.form.gender]}
                                            onOk={this.handleFormChange.bind(this, 'gender')}>
                                        <List.Item arrow="horizontal" style={{height:'44px'}}>性别</List.Item>
                                    </Picker>

                                    <InputItem value={this.state.form.email} placeholder={'请输入电子邮箱'}
                                               onChange={this.handleFormChange.bind(this, 'email')}>电子邮箱</InputItem>

                                    <DatePicker className={'abc'}
                                                mode="date"
                                                title="出生日期"
                                                extra="请选择出生日期"
                                                value={this.state.form.birthday}
                                                onOk={this.handleFormChange.bind(this, 'birthday')}
                                    >
                                        <List.Item arrow="horizontal" style={{height:'44px'}}>出生日期</List.Item>
                                    </DatePicker>

                                    <WhiteSpace/>
                                    <Button type="primary" onClick={this.register}>注册</Button>

                                </List>
                            )
                            :
                            (
                                <List>
                                    <InputItem value={this.state.loginForm.phone} type={"phone"} placeholder={'请输入手机号'}
                                               onChange={this.handleTherapistFormChange.bind(this, 'phone')}>手机号</InputItem>

                                    <InputItem type="password" value={this.state.loginForm.password}
                                               placeholder={'请输入密码'}
                                               onChange={this.handleTherapistFormChange.bind(this, 'password')}>密码</InputItem>
                                    <WhiteSpace/>
                                    <Button type="primary" onClick={this.register}>登录</Button>
                                </List>
                            )
                    }

                </WingBlank>


            </div>
        );
    }
}

export default Index;