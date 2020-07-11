import React, {Component} from 'react';
import {TextareaItem} from "antd-mobile";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            index: this.props.index,
            readonly: !!this.props.readonly
        }
    }


    render() {
        return (
            <div className={'question'}>
                <p className={'title'}>
                    {this.state.item.name}
                </p>
                {
                    this.state.readonly?
                        <p style={{fontSize:'12px',paddingTop:'.5em',paddingLeft:'1em',lineHeight:'1.5em'}}>{this.state.item.value}</p>
                        :

                        <TextareaItem style={{fontSize: '12px'}}
                                      onBlur={(value) => {

                                          this.props.onUpdate((val, self, isBaseMeasure) => {
                                              if (isBaseMeasure) {
                                                  let roleAnswer = self.state.roleAnswer;

                                                  roleAnswer[this.state.index].value = val;

                                                  self.setState({
                                                      roleAnswer
                                                  })
                                              } else {
                                                  let organizationAnswer = self.state.organizationAnswer;

                                                  organizationAnswer[this.state.index].value = val;

                                                  self.setState({
                                                      organizationAnswer
                                                  })
                                              }

                                          }, value, this.props.isBaseMeasure)

                                      }
                                      }
                                      placeholder="请输入"
                                      autoHeight
                        />
                }

            </div>
        );
    }
}

export default Index;
