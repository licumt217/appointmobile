import React, {Component} from 'react';

import {TextareaItem, WingBlank, Radio, WhiteSpace, Switch, List, Button, Flex} from "antd-mobile";

import Util from "../../../assets/js/Util";

import QUESTION_TYPE from "../../../assets/js/constants/QUESTION_TYPE";

import {
    getAnswerMeasureList,
} from "../../../http/service";

import './index.less'

import Wenda from '../preCheck/components/Wenda'
import Zhidaoyu from '../preCheck/components/Zhidaoyu'
import Xuanzeti from '../preCheck/components/Xuanzeti'
import Matrix from '../preCheck/components/Matrix'
import Multi from '../preCheck/components/Multi'


class Index extends Component {

    constructor(props) {
        super(props);

        this.user_id = this.props.location.state.user_id;
        this.division_id = this.props.location.state.division_id;

        // this.user_id='ce645425d808411eaee861ecdaf348c3'
        // this.division_id='9e8e0011109d4c92b7855a157b98a174'

        this.state = {
            roleAnswer: [],
            organizationAnswer: []

        }
    }

    componentDidMount() {
        this.getAnswerMeasureList();
    }

    getAnswerMeasureList = () => {
        //回答预检表：基础的和当前分部的
        getAnswerMeasureList({
            organization_id: this.division_id,
            user_id:this.user_id
        }).then(data => {
            let roleAnswer = data.roleAnswer||[];
            let organizationAnswer = data.organizationAnswer||[];

            if(organizationAnswer){
                organizationAnswer.forEach(item => {
                    if (item.type === QUESTION_TYPE.Xuanzheti || item.type === QUESTION_TYPE.Huang ) {
                        if(typeof item.answer==='string'){
                            item.answer = JSON.parse(item.answer)
                        }
                    } else if (item.type === QUESTION_TYPE.Matrix || item.type === QUESTION_TYPE.Multi) {
                        item.children.forEach(item => {
                            if(typeof item.answer==='string'){
                                item.answer = JSON.parse(item.answer)
                            }
                        })
                    }
                })
            }

            if(roleAnswer){
                roleAnswer.forEach(item => {
                    if (item.type === QUESTION_TYPE.Xuanzheti || item.type === QUESTION_TYPE.Huang) {
                        if(typeof item.answer==='string'){
                            item.answer = JSON.parse(item.answer)
                        }
                    } else if (item.type === QUESTION_TYPE.Matrix || item.type === QUESTION_TYPE.Multi) {
                        item.children.forEach(item => {
                            if(typeof item.answer==='string'){
                                item.answer = JSON.parse(item.answer)
                            }
                        })
                    }
                })
            }


            this.setState({
                roleAnswer,
                organizationAnswer
            })
        }).catch(err => {
            Util.fail(err)
        });
    }


    back = () => {
        this.props.history.goBack()
    }


    getQuestionComponent = (item) => {
        let Question = null
        switch (item.type) {

            case QUESTION_TYPE.Wenda:
                Question = Wenda;
                break;
            case QUESTION_TYPE.Zhidaoyu:
                Question = Zhidaoyu;
                break;
            case QUESTION_TYPE.Xuanzheti:
            case QUESTION_TYPE.Huang:
                Question = Xuanzeti;
                break;
            case QUESTION_TYPE.Matrix:
                Question = Matrix;
                break;
            case QUESTION_TYPE.Multi:
                Question = Multi;
                break;
        }
        return Question
    }

    render() {


        return (
            <div>
                <WhiteSpace/>
                <div className={'center'} style={{fontSize:'1.2em'}}>预检表详情</div>
                <WhiteSpace/>
                {
                    this.state.roleAnswer.length>0?
                        (
                            <React.Fragment>
                                <p style={{textAlign:'center'}}>基础题</p>
                                <WhiteSpace/>
                                {
                                    this.state.roleAnswer.map((item, index) => {

                                        let Question=this.getQuestionComponent(item)

                                        return (
                                            <WingBlank key={index}>
                                                <Question item={item} isBaseMeasure={true} index={index} readonly={true}/>
                                            </WingBlank>
                                        )
                                    })
                                }
                            </React.Fragment>

                        )
                        :null

                }
                <WhiteSpace/>
                {
                    this.state.organizationAnswer.length>0?
                        (
                            <React.Fragment>
                                <p style={{textAlign:'center'}}>附加题</p>
                                {
                                    this.state.organizationAnswer.map((item, index) => {

                                        let Question=this.getQuestionComponent(item)

                                        return (
                                            <WingBlank key={index}>
                                                <Question item={item} isBaseMeasure={false} index={index} readonly={true}/>
                                            </WingBlank>
                                        )
                                    })
                                }
                            </React.Fragment>

                        )
                        :null

                }
                <WhiteSpace/>
                <Flex>
                    <Flex.Item>
                        <Button onClick={this.back}>返回</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
            </div>
        );
    }
}

export default Index;
