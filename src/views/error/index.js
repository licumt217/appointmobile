import React, {Component} from 'react';

import {WhiteSpace,Result,Icon} from "antd-mobile";

class Index extends Component {
    render() {
        return (
            <div>
                <Result
                    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                    title="授权失败"
                    message="授权码为空，请联系管理员"
                />
            </div>
        );
    }
}

export default Index;