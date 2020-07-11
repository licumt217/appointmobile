import React, {Component} from 'react';
import {List, Radio, WhiteSpace} from "antd-mobile";
const RadioItem = Radio.RadioItem
class Index extends Component {

    constructor(props) {
        super(props);
        this.state={
            item:this.props.item,
            index:this.props.index,
            readonly: !!this.props.readonly
        }
    }


    render() {
        return (
            <div className={'question'}>
                <p className={'title'}>
                    {this.state.item.questionIndex + "、" + this.state.item.name}
                </p>
                <WhiteSpace/>
                {
                    this.state.item.children.map((child, childIndex) => {
                        return (
                            <div style={{paddingLeft: '1em'}} className={'question'}
                                 key={childIndex}>
                                <p className={'title'}>
                                    {(childIndex + 1) + "、" + child.name}
                                </p>
                                <WhiteSpace/>
                                <List>
                                    {child.answer.map((i, iIndex) => (
                                        <RadioItem key={iIndex}
                                                   checked={i.value === child.value}
                                                   disabled={this.state.readonly}
                                                   onChange={() => {
                                                       this.props.onUpdate((val,self,isBaseMeasure)=>{
                                                           if(isBaseMeasure){
                                                               let roleAnswer = self.state.roleAnswer;

                                                               roleAnswer[this.state.index].children[childIndex].value = val;

                                                               self.setState({
                                                                   roleAnswer
                                                               })
                                                           }else{
                                                               let organizationAnswer = self.state.organizationAnswer;

                                                               organizationAnswer[this.state.index].children[childIndex].value = val;

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
                        )
                    })
                }
            </div>
        );
    }
}

export default Index;
