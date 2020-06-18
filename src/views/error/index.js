import React, {Component} from 'react';

import {WhiteSpace,Result,Icon} from "antd-mobile";
import './index.less'
class Index extends Component {
    constructor(props) {
        super(props);

        this.state={
            errMsg:this.props.location.state.errMsg
        }
    }
    render() {
        return (
            <div>
                <Result
                    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                    title="登录失败"
                    message={this.state.errMsg}
                />
            </div>
        );
    }
}

export default Index;