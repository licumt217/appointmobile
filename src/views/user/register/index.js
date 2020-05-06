import React, {Component} from 'react';

import Util from '../../../assets/js/Util'

import {Tabs, WhiteSpace, Badge, List, InputItem, Picker, DatePicker, Button,WingBlank} from 'antd-mobile';
import {bindUser,registerAndBind} from '../../../http/service'

class Index extends Component {

    constructor() {
        super();
        this.state = {
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

            registerAndBind( this.state.form).then((data) => {

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

            bindUser( this.state.loginForm).then((data) => {

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
        let form = this.state.form;
        form[type] = value;
        this.setState({
            form
        })
    }


    render() {

        const tabs = [
            {title: '用户注册'},
            {title: '咨询师登录'},
        ];

        return (
            <div className="login-wrap">

                <Tabs tabs={tabs}
                      initialPage={0}
                >
                    <div>
                        <WingBlank>
                            <List>

                                <InputItem value={this.state.form.phone} maxLength={11}
                                           onChange={this.handleFormChange.bind(this, 'phone')}>手机号</InputItem>

                                <InputItem value={this.state.form.identification_no}
                                           onChange={this.handleFormChange.bind(this, 'identification_no')}>身份证号</InputItem>

                                <InputItem value={this.state.form.name}
                                           onChange={this.handleFormChange.bind(this, 'name')}>姓名</InputItem>

                                <Picker data={Util.genderOptions} cols={1}
                                        extra="请选择"
                                        value={[this.state.form.gender]}
                                        onOk={this.handleFormChange.bind(this, 'gender')}>
                                    <List.Item arrow="horizontal">性别</List.Item>
                                </Picker>

                                <InputItem value={this.state.form.email}
                                           onChange={this.handleFormChange.bind(this, 'email')}>电子邮箱</InputItem>

                                <DatePicker
                                    mode="date"
                                    title="出生日期"
                                    extra="请选择"
                                    value={this.state.form.birthday}
                                    onOk={this.handleFormChange.bind(this, 'birthday')}
                                >
                                    <List.Item arrow="horizontal">出生日期</List.Item>
                                </DatePicker>

                                <WhiteSpace/>
                                <Button size={"small"} type="ghost" onClick={this.register}>注册</Button>

                            </List>
                        </WingBlank>
                    </div>

                    <div>

                        <WingBlank>
                            <List>
                                <InputItem value={this.state.loginForm.phone} maxLength={11}
                                           onChange={this.handleTherapistFormChange.bind(this, 'phone')}>手机号</InputItem>

                                <InputItem type="password" value={this.state.loginForm.password}
                                           onChange={this.handleTherapistFormChange.bind(this, 'password')}>密码</InputItem>
                                <WhiteSpace/>
                                <Button size={"small"} type="ghost" onClick={this.register}>登录</Button>
                            </List>
                        </WingBlank>

                    </div>

                </Tabs>


            </div>
        );
    }
}

export default Index;