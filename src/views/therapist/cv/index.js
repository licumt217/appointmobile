import React, {Component} from 'react';

import {Card,List,WingBlank,WhiteSpace} from "antd-mobile";

import Util from "../../../assets/js/Util";

import {SEX} from "../../../assets/js/constants/constant"

import {getCvByTherapistId,getSchooltypeList,getTherapistById} from '../../../http/service'

class Index extends Component {


    constructor(props) {
        super(props);

        this.therapist_id=this.props.location.state.therapist_id

        this.state={
            person:{}
        }
    }

    componentDidMount() {
        this.getCvByTherapistId();
    }


    getCvByTherapistId=()=> {

        getCvByTherapistId({
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
                        <Card.Header title={'咨询师简历'}></Card.Header>
                        <Card.Body>
                            <List renderHeader={"资历"}>
                                <List.Item multipleLine wrap>
                                    {this.state.person.qualification}
                                </List.Item>
                            </List>
                            <List renderHeader={"擅长领域"}>
                                <List.Item multipleLine wrap>
                                    {this.state.person.field}
                                </List.Item>
                            </List>
                            <List renderHeader={"临床经验"}>
                                <List.Item multipleLine wrap>
                                    {this.state.person.experience}
                                </List.Item>
                            </List>
                            <List renderHeader={"受训经历"}>
                                <List.Item multipleLine wrap>
                                    {this.state.person.train}
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