import React, {Component} from 'react';

import Util from '../../../assets/js/Util'

import {WhiteSpace, WingBlank, Badge, List, InputItem, Picker, DatePicker, Button} from 'antd-mobile';

import {getUserById, updateUser} from '../../../http/service'

import store from "../../../store";


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                phone: '',
                identification_no: '',
                name: '',
                gender: 'male',
                email: '',
                birthday: '',
                openid: store.getState().openid
            },
        }

        this.getById()
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

    update = () => {


        if (this.isValid()) {
            // this.$router.push('/appoint/myAppoint')
            // return;

            updateUser(this.state.form).then((data) => {

                Util.success("修改成功")

                this.props.history.push({
                    pathname: '/appoint/myAppoint'
                })

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


    getById = () => {
        getUserById().then((data) => {

            this.setState({
                form: data
            })

        }).catch(err => {
            Util.fail(err)
        })
    }


    render() {

        return (

            <WingBlank>
                <List>
                    <List.Item><h3>用户信息修改</h3></List.Item>

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
                        <List.Item arrow="horizontal" style={{height: '44px'}}>性别</List.Item>
                    </Picker>

                    <InputItem value={this.state.form.email}
                               onChange={this.handleFormChange.bind(this, 'email')}>电子邮箱</InputItem>

                    <DatePicker
                        mode="date"
                        title="出生日期"
                        extra="请选择"
                        value={new Date(this.state.form.birthday)}
                        onOk={this.handleFormChange.bind(this, 'birthday')}
                    >
                        <List.Item arrow="horizontal" style={{height: '44px'}}>出生日期</List.Item>
                    </DatePicker>

                    <WhiteSpace/>

                    <Button type={"primary"} size={"small"} onClick={this.update}>修改</Button>

                </List>
            </WingBlank>


        );
    }
}

export default Index;