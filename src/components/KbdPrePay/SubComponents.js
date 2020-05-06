import React, {Component} from "react";
import buttondelete from "../../assets/images/buttondelete.png";

class ZhPiece extends Component {
    render() {
        return <input type="button" className="prePayKbdZhBtn" value={this.props.value} onClick={this.props.handlePieceClick}/>
    }
}

class ZhRow extends Component {
    render() {
        return (
            <div className="prePayKbdMainRow">
                {
                    this.props.data.map((item,index)=>{
                        return <ZhPiece key={index} value={item} handlePieceClick={this.props.handlePieceClick}/>
                    })
                }
            </div>
        )
    }
}


class ZhBlock extends Component {
    render() {
        return (
            <div className="prePayKbdMainCarnum">
                {
                    this.props.data.map((item,index)=>{
                        return <ZhRow key={index} data={item}  handlePieceClick={this.props.handlePieceClick}/>
                    })
                }
            </div>

        )
    }
}

class EnPiece extends Component {
    render() {
        return this.props.value==='del'?
            // <input type="button" className="keyboard_en_btn" value={this.props.value} onClick={this.props.handlePieceClick}/>
            <span onTouchEnd={this.props.handleDelete}><img src={buttondelete} /></span>
            :
            <input type="button" className="keyboard_en_btn" value={this.props.value} onClick={this.props.handlePieceClick}/>

    }
}

class EnRow extends Component {
    render() {
        return (
            <div className="keyboard_main_en_row">
                {
                    this.props.data.map((item,index)=>{
                        return <EnPiece key={index} value={item} handlePieceClick={this.props.handlePieceClick} handleDelete={this.props.handleDelete}/>
                    })
                }
            </div>
        )
    }
}


class EnBlock extends Component {
    render() {
        return (
            <div className="prePayKbdMainBottomCarnum prePayKbdMainBottomCarnum">
                {
                    this.props.data.map((item,index)=>{
                        return <EnRow key={index} data={item}  handlePieceClick={this.props.handlePieceClick} handleDelete={this.props.handleDelete}/>
                    })
                }
            </div>

        )
    }
}

class InputZone extends Component {
    render() {
        return (
            <div>
                <div className="prePayKbdCarInput">

                    {
                        this.props.data.map((item,index)=>{
                            return <input type="button"
                                          key={index}
                                          value={item}
                                          className={index===this.props.curActiveIndex?(index===0?'prePayActiveFirst':(index===7)?'prePayActiveLast':'prePayActiveCommon'):''}
                                          onTouchEnd={this.props.handleInputClick.bind(this, index)}
                            />
                        })
                    }

                </div>
            </div>
        )
    }
}

class Tip extends Component {
    render() {
        return (
            <p className="bgShadow">
                <span>请输入您的车牌号</span>
            </p>


        )
    }
}



export {ZhBlock,ZhRow,ZhPiece,EnBlock,EnRow,EnPiece,InputZone,Tip}