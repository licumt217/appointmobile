import React, {Component} from 'react';

import Util from '../../../assets/js/Util'

import {Tabs, WhiteSpace, SegmentedControl, List, InputItem, Picker, DatePicker, Button, WingBlank} from 'antd-mobile';
import {bindUser, registerAndBind} from '../../../http/service'
import store from "../../../store";
import Role from "../../../assets/js/Role";


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
            },
            loginForm: {
                phone: '',
                password: '',
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

    dispatchLoginInfo=(data)=>{
        store.dispatch({
            type:'login',
            payload:true
        })

        store.dispatch({
            type:'user_id',
            payload:data.userInfo.user_id
        })

        store.dispatch({
            type:'token',
            payload:data.token
        })

        store.dispatch({
            type:'role',
            payload:Role.client
        })
    }

    register = () => {


        if (this.isValid()) {

            registerAndBind(this.state.form).then((data) => {
                debugger

                Util.success("注册成功")

                this.dispatchLoginInfo(data);

                //TODO 入口是哪个菜单，注册后需要跳转到具体菜单。

                this.props.history.push('/appoint/myAppoint')

            }).catch(err => {
                debugger
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

    dispatchLoginInfoOfTherapist=(data)=>{
        store.dispatch({
            type:'login',
            payload:true
        })

        store.dispatch({
            type:'user_id',
            payload:data.userInfo.user_id
        })

        store.dispatch({
            type:'token',
            payload:data.token
        })

        store.dispatch({
            type:'role',
            payload:Role.therapist
        })
    }

    /**
     * 已在pc端注册过的咨询师登录，进行账号关联
     */
    login = () => {
        if (this.isValidWhenLogin()) {

            bindUser(this.state.loginForm).then((data) => {

                Util.success('登录成功')

                this.dispatchLoginInfoOfTherapist(data)

                this.props.history.push('/appoint/myAppoint')

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
                <SegmentedControl values={['用户注册', '咨询师登录']} selectedIndex={this.state.tabIndex}
                                  style={{height: '32px', width: '90vw', margin: '10px auto'}} onChange={(e) => {
                    this.setState({tabIndex: e.nativeEvent.selectedSegmentIndex})
                }}/>


                <WingBlank>
                    {
                        this.state.tabIndex === 0 ?
                            (
                                <List>

                                    <InputItem value={this.state.form.phone} maxLength={11} placeholder={'请输入手机号'}
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
                                                minDate={new Date(1900,1,1,0,0,0)}
                                                maxDate={new Date(2100,1,1,0,0,0)}
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
                                    <InputItem value={this.state.loginForm.phone} maxLength={11} placeholder={'请输入手机号'}
                                               onChange={this.handleTherapistFormChange.bind(this, 'phone')}>手机号</InputItem>

                                    <InputItem type="password" value={this.state.loginForm.password}
                                               placeholder={'请输入密码'}
                                               onChange={this.handleTherapistFormChange.bind(this, 'password')}>密码</InputItem>
                                    <WhiteSpace/>
                                    <Button type="primary" onClick={this.login}>登录</Button>
                                </List>
                            )
                    }

                </WingBlank>


            </div>
        );
    }
}

export default Index;