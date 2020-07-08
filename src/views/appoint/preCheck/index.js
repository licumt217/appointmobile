import React, {Component} from 'react';

import {TextareaItem, WingBlank, Radio, WhiteSpace, Switch, List, Button, Flex} from "antd-mobile";

import Util from "../../../assets/js/Util";

import QUESTION_TYPE from "../../../assets/js/constants/QUESTION_TYPE";

import {
    getMeasureList,
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
            organizationId: this.division_id
        }).then(data => {

            if (data.status === 1) {//已回答过
                Util.notice({
                    msg: '您已回答过预检表',
                    onConfirm: () => {

                        this.back()
                    },
                })
            } else {

                let roleAnswer = data.roleAnswer;

                roleAnswer.forEach(item => {
                    if (item.type === QUESTION_TYPE.Xuanzheti || item.type === QUESTION_TYPE.Huang) {
                        item.answer = JSON.parse(item.answer)
                    } else if (item.type === QUESTION_TYPE.Matrix || item.type === QUESTION_TYPE.Multi) {
                        item.children.forEach(item => {
                            item.answer = JSON.parse(item.answer)
                        })
                    }
                })
                this.setState({
                    roleAnswer
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

        let aaa = this.state.roleAnswer

        debugger

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
                <div className={'center'}>填写预检表</div>
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
