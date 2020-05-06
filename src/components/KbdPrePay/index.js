import React, {Component} from 'react';

import {ZhBlock, EnBlock, InputZone,Tip} from './SubComponents'
import './kbdPrePay.less'


class KbdPrePay extends Component {

    constructor(props) {
        super(props);

        this.zhRowArray = [
            ['京', '津', '冀', '鲁', '晋', '蒙', '辽', '吉', '黑', '沪'],
            ['苏', '浙', '皖', '闽', '赣', '豫', '鄂', '湘', '粤', '桂'],
            ['渝', '川', '贵', '云', '藏', '陕', '甘', '青'],
            ['琼', '新', '港', '澳', '台', '宁']
        ]

        this.enRowArray = [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'del'],
        ]
        this.state = {
            curActiveIndex: 0,
            valueArray: ['', '', '', '', '', '', '', '']
        }


    }

    componentDidMount() {
        this.initProvince();
    }

    initProvince=()=>{
        if(this.props.province){
            this.setValue2Input(this.props.province)
        }
    }

    handleInputClick = (index, e) => {
        this.setState({
            curActiveIndex: index
        })
        e.stopPropagation()
    }

    handleDelete = () => {
        let valueArray = [...this.state.valueArray]
        valueArray.splice(this.state.curActiveIndex, 1, '')
        this.setState({
            valueArray,
            curActiveIndex: this.state.curActiveIndex === 0 ? this.state.curActiveIndex : this.state.curActiveIndex - 1
        })
    }

    handlePieceClick = (e) => {
        let value = e.target.value;
        this.setValue2Input(value)

    }

    setValue2Input=(value)=>{
        let valueArray = [...this.state.valueArray]
        valueArray.splice(this.state.curActiveIndex, 1, value)
        this.setState({
            valueArray,
            curActiveIndex: this.state.curActiveIndex < 7 ? this.state.curActiveIndex + 1 : this.state.curActiveIndex
        })
    }

    render() {
        return (
            <div className="prePayKbdCmpContainer">

                <Tip />

                <InputZone handleInputClick={this.handleInputClick} data={this.state.valueArray}
                           curActiveIndex={this.state.curActiveIndex}/>


                <div className="prePayKbdMainArea">
                    {
                        this.state.curActiveIndex === 0 ?
                                <ZhBlock data={this.zhRowArray} handlePieceClick={this.handlePieceClick}/>
                            :
                                <EnBlock data={this.enRowArray} handlePieceClick={this.handlePieceClick} handleDelete={this.handleDelete}/>
                    }

                    <input type="button" value="确定" className="prePayKbdSure" onTouchEnd={this.props.query.bind(this,this.state.valueArray.join(''))}/>
                </div>


            </div>
        );
    }
}

export default KbdPrePay;