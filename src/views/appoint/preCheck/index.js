import React, {Component} from 'react';

import {TextareaItem, WingBlank, Radio, WhiteSpace, Switch, List, Button, Flex} from "antd-mobile";

import Util from "../../../assets/js/Util";

import QUESTION_TYPE from "../../../assets/js/constants/QUESTION_TYPE";

import {
    getMeasureList,
    saveAnswer
} from "../../../http/service";

import './index.less'

import Wenda from './components/Wenda'
import Zhidaoyu from './components/Zhidaoyu'
import Xuanzeti from './components/Xuanzeti'
import Matrix from './components/Matrix'
import Multi from './components/Multi'

const RadioItem = Radio.RadioItem


class Index extends Component {

    constructor(props) {
        super(props);

        this.division_id = this.props.location.state.division_id;
        this.therapist_id = this.props.location.state.therapist_id;
        this.station_id = this.props.location.state.station_id;

        this.state = {
            roleAnswer: [],
            organizationAnswer: []

        }
    }

    componentDidMount() {
        this.getMeasureList();
    }

    getMeasureList = () => {
        //回答预检表：基础的和当前分部的
        getMeasureList({
            organization_id: this.division_id
        }).then(data => {

            if (data.status === 1) {//已回答过
                Util.notice({
                    msg: '您已回答过预检表',
                    onConfirm: () => {

                        this.back()
                    },
                })
            } else {

                let roleAnswer = data.roleAnswer||[];
                let organizationAnswer = data.organizationAnswer||[];

                if(organizationAnswer){
                    organizationAnswer.forEach(item => {
                        if (item.type === QUESTION_TYPE.Xuanzheti || item.type === QUESTION_TYPE.Huang) {
                            item.answer = JSON.parse(item.answer)
                        } else if (item.type === QUESTION_TYPE.Matrix || item.type === QUESTION_TYPE.Multi) {
                            item.children.forEach(item => {
                                item.answer = JSON.parse(item.answer)
                            })
                        }
                    })
                }

                if(roleAnswer){
                    roleAnswer.forEach(item => {
                        if (item.type === QUESTION_TYPE.Xuanzheti || item.type === QUESTION_TYPE.Huang) {
                            item.answer = JSON.parse(item.answer)
                        } else if (item.type === QUESTION_TYPE.Matrix || item.type === QUESTION_TYPE.Multi) {
                            item.children.forEach(item => {
                                item.answer = JSON.parse(item.answer)
                            })
                        }
                    })
                }


                this.setState({
                    roleAnswer,
                    organizationAnswer
                })

            }
        }).catch(err => {
            Util.fail(err)
        });
    }


    back = () => {
        this.props.history.goBack()
    }

    commit = () => {

        let roleAnswer = this.state.roleAnswer
        let organizationAnswer = this.state.organizationAnswer

        for(let i=0;i<roleAnswer.length;i++){
            let question=roleAnswer[i]
            if(question.type===QUESTION_TYPE.Wenda){
                if(!question.value){
                    Util.info(`基础题有问答题未填写，请检查！`)
                    return;
                }
            }else if(question.type===QUESTION_TYPE.Xuanzheti || question.type===QUESTION_TYPE.Huang ){
                if(!question.value && question.value!==0){
                    Util.info(`基础题第${question.questionIndex}题未填写，请检查！`)
                    return;
                }
            }else if(question.type===QUESTION_TYPE.Matrix || question.type===QUESTION_TYPE.Multi ){
                let children=question.children;

                for(let j=0;j<children.length;j++){
                    let child=children[j];
                    if(!child.value && child.value!==0){
                        Util.info(`基础题第${question.questionIndex}题未填写，请检查！`)
                        return;
                    }
                }
            }
        }

        for(let i=0;i<organizationAnswer.length;i++){
            let question=organizationAnswer[i]
            if(question.type===QUESTION_TYPE.Wenda){
                if(!question.value){
                    Util.info(`附加题有问答题未填写，请检查！`)
                    return;
                }
            }else if(question.type===QUESTION_TYPE.Xuanzheti || question.type===QUESTION_TYPE.Huang ){
                if(!question.value && question.value!==0){
                    Util.info(`附加题第${question.questionIndex}题未填写，请检查！`)
                    return;
                }
            }else if(question.type===QUESTION_TYPE.Matrix || question.type===QUESTION_TYPE.Multi ){
                let children=question.children;

                for(let j=0;j<children.length;j++){
                    let child=children[j];
                    if(!child.value && child.value!==0){
                        Util.info(`附加题第${question.questionIndex}题未填写，请检查！`)
                        return;
                    }
                }
            }
        }

        saveAnswer({
            organization_id: this.division_id,
            roleAnswer:JSON.stringify(roleAnswer),
            organizationAnswer:JSON.stringify(organizationAnswer)
        }).then(data => {

            Util.success("提交成功")
            this.props.history.push({
                pathname: '/appoint/selectDate',
                state: {
                    therapist_id: this.therapist_id,
                    station_id: this.station_id,
                }
            })
        }).catch(err => {
            Util.fail(err)
        });

    }

    update = (callback, value, isBaseMeasure) => {
        callback(value, this, isBaseMeasure)
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
                <div className={'center'} style={{fontSize:'1.2em'}}>填写预检表</div>
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
                                                <Question item={item} isBaseMeasure={true} index={index} onUpdate={this.update}/>
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
                                                <Question item={item} isBaseMeasure={false} index={index} onUpdate={this.update}/>
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
                        <Button type="primary" onClick={this.commit}>提交</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace/>
            </div>
        );
    }
}

export default Index;
