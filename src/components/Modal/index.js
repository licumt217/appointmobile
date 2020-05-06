import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less'

/**
 * 移动端弹窗
 */
class Modal extends Component {

    constructor(props) {

        super(props);

        this.defaultConfig = {
            show: true,
            msg: '网络繁忙请稍等',
            oneButton: true,
            cancelButtonText: '取消',
            buttonText: '确定'
        }

        this.state = Object.assign(this.defaultConfig, typeof this.props.data !== "string" ? this.props.data || {} : {msg: this.props.data})

    }

    hide = () => {
        this.setState({
            show: false
        })
    }

    handleCallback = () => {
        this.hide()
        this.props.data && this.props.data.callback && this.props.data.callback();
    }

    handleCallbackForCancel = () => {
        this.hide()
        this.props.data && this.props.data.callbackForCancel && this.props.data.callbackForCancel();
    }

    getIconType = () => {
        let plate;

        switch (this.state.type) {
            case 0:
                plate = <div className="tjd-dialog-header fail"/>;
                break;
            case 1:
                plate = <div className="tjd-dialog-header ok"/>
                break;
            case 2:
                plate = <div className="tjd-dialog-header confirm"/>
                break;
            default:
                plate = <div className="tjd-dialog-header alert"/>
                break;
        }

        return plate;
    }


    render() {

        return (

            <React.Fragment>
                {
                    this.state.show ?
                        <div>

                            <div className="tjd-dialog-mask"/>


                            <div className='tjd-dialog-window'>

                                {this.getIconType()}

                                <div className="tjd-dialog-content">
                                    <p className="modal_info_top">{this.state.msg}</p>
                                </div>

                                <div className='tjd-dialog-footer'>
                                    {
                                        !this.state.oneButton ?
                                            <button className='tjd_cancel' onClick={this.handleCallbackForCancel}>
                                                {this.state.cancelButtonText}
                                            </button>
                                            : null
                                    }
                                    <button className="tjd_confirm" onClick={this.handleCallback}>
                                        {this.state.buttonText}
                                    </button>

                                </div>

                            </div>

                        </div>
                        : null
                }
            </React.Fragment>

        );
    }
}

class Index extends Component {

    static show(obj) {

        const id = 'common_modal'

        this.container = document.getElementById(id)

        this.container && document.body.removeChild(this.container)

        this.container = document.createElement('div');

        this.container.setAttribute('id', id)

        document.body.appendChild(this.container);

        ReactDOM.render(<Modal data={obj}/>, this.container)

    }

}

export default Index;