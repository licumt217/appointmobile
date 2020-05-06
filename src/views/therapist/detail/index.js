import React, {Component} from 'react';

import {Card,List,WingBlank,WhiteSpace} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {SEX} from "../../../assets/js/constants/constant"

import {getQualificationtypeList,getSchooltypeList,getTherapistById} from '../../../http/service'

class Index extends Component {


    constructor(props) {
        super(props);

        this.therapist_id=this.props.location.state.therapist_id
        this.schoolTypeObj={}
        this.qualificationTypeObj={}

        this.state={
            person:{}
        }
    }

    componentDidMount() {
        this.getDetail();
        this.getQualificationTypeList()
        this.getSchoolTypeList()
    }


    getQualificationTypeList=()=> {
        getQualificationtypeList().then((data) => {

            this.qualificationTypeObj = Util.array2Object(data, 'qualification_type_id')

        }).catch(err => {
            Util.fail(err)
        })
    }

    getSchoolTypeList=()=> {
        getSchooltypeList().then((data) => {

            this.schoolTypeObj = Util.array2Object(data, 'school_type_id')

        }).catch(err => {
            Util.fail(err)
        })
    }
    getDetail=()=> {

        getTherapistById({
            therapist_id: this.therapist_id
        }).then((data) => {

            this.setState({
                person:data
            })

        }).catch(err => {
            Util.fail(err)
        })

    }


    render() {
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <Card>
                        <Card.Header title={'咨询师详情'}></Card.Header>
                        <Card.Body>
                            <List>
                                <List.Item>
                                    姓名：{this.state.person.name}
                                </List.Item>

                                <List.Item>
                                    性别：{SEX[this.state.person.gender]}
                                </List.Item>

                                <List.Item>
                                    流派：{
                                    this.schoolTypeObj[this.state.person.school_type_id]
                                        ?
                                        this.schoolTypeObj[this.state.person.school_type_id].school_type_name
                                        :null
                                }
                                </List.Item>
                                <List.Item>
                                    资历：{
                                    this.qualificationTypeObj[this.state.person.qualification_type_id]
                                        ?
                                        this.qualificationTypeObj[this.state.person.qualification_type_id].qualification_type_name
                                        :null
                                }
                                </List.Item>

                            </List>
                        </Card.Body>
                    </Card>
                </WingBlank>
            </div>
        );
    }
}

export default Index;