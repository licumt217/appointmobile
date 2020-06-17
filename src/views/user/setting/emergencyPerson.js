import React, {Component} from 'react';

import Util from '../../../assets/js/Util'

import {InputItem,Flex,Button,List,WingBlank,WhiteSpace} from 'antd-mobile';

import {addEmergencyContack,updateEmergencyContack} from '../../../http/service'



class EmergencyPerson extends Component {

    constructor(props) {
        super(props);



        this.state={
            form:{},
            title:''
        }


    }

    componentDidMount() {

        if(this.props.location.state && this.props.location.state.item){
            this.setState({
                form:this.props.location.state.item,
                title:'修改紧急联系人'
            })
        }else{
            this.setState({
                title:'新增紧急联系人'
            })
        }

    }

    isValid=()=> {

        if (!(this.state.form.name)) {
            Util.info("请输入姓名")
            return false;
        }

        if (!(this.state.form.relation)) {
            Util.info("请输入关系")
            return false;
        }

        if (!(this.state.form.phone && Util.isValidPhone(this.state.form.phone))) {
            Util.info("请输入正确的手机号")
            return false;
        }

        if (!(this.state.form.email && Util.isValidEmail(this.state.form.email))) {
            Util.info("请输入正确的电子邮箱")
            return false;
        }

        return true;
    }


    handleFormChange = (type, value) => {
        let form = this.state.form;
        form[type] = value;


        this.setState({
            form
        })
    }

    back=()=>{
        this.props.history.push('/user/setting')
    }

    save=()=>{
        if (this.isValid()) {

            if(this.state.form.emergency_contack_id){
                updateEmergencyContack(this.state.form).then((data) => {

                    Util.success("操作成功")

                    this.back()

                }).catch(err => {
                    Util.fail(err)
                })
            }else{
                addEmergencyContack(this.state.form).then((data) => {

                    Util.success("操作成功")

                    this.back()


                }).catch(err => {
                    Util.fail(err)
                })
            }


        }
    }



    render() {
        return (
            <WingBlank>
                <List>
                    <List.Item className={'center'}><p style={{fontSize:'16px'}}>{this.state.title}</p></List.Item>
                </List>
                <InputItem value={this.state.form.name} maxLength={20}
                           onChange={this.handleFormChange.bind(this, 'name')}>姓名</InputItem>

                <InputItem value={this.state.form.relation} maxLength={20}
                           onChange={this.handleFormChange.bind(this, 'relation')}>关系</InputItem>

                <InputItem value={this.state.form.phone} maxLength={11}
                           onChange={this.handleFormChange.bind(this, 'phone')}>手机号</InputItem>

                <InputItem value={this.state.form.email} maxLength={50}
                           onChange={this.handleFormChange.bind(this, 'email')}>电子邮箱</InputItem>

                <WhiteSpace/>
                <Flex>
                    <Flex.Item>
                        <Button size={"small"} onClick={this.back}>取消</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button size={"small"} type={"primary"} onClick={this.save}>确定</Button>
                    </Flex.Item>
                </Flex>


            </WingBlank>
        );
    }
}

export default EmergencyPerson;