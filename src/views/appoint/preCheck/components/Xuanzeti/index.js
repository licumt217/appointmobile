import React, {Component} from 'react';
import {List, Radio, TextareaItem, WhiteSpace} from "antd-mobile";
const RadioItem = Radio.RadioItem
class Index extends Component {

    constructor(props) {
        super(props);
        this.state={
            item:this.props.item,
            index:this.props.index,
        }
    }





    render() {
        return (
            <div className={'question'}>
                <p className={'title'}>
                    {this.state.item.questionIndex + "、" + this.state.item.name}
                </p>
                <WhiteSpace/>
                <List>
                    {this.state.item.answer.map(i => (
                        <RadioItem key={i.value} checked={this.state.item.value === i.value}
                                   onChange={() => {

                                       this.props.onUpdate((val,self,isBaseMeasure)=>{
                                           if(isBaseMeasure){
                                               let roleAnswer = self.state.roleAnswer;

                                               roleAnswer[this.state.index].value = val;

                                               self.setState({
                                                   roleAnswer
                                               })
                                           }else{
                                               let organizationAnswer = self.state.organizationAnswer;

                                               organizationAnswer[this.state.index].value = val;

                                               self.setState({
                                                   organizationAnswer
                                               })
                                           }

                                       },i.value,this.props.isBaseMeasure)

                                   }}>
                            {i.key}
                        </RadioItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default Index;