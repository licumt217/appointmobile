import React, {Component} from 'react';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state={
            item:this.props.item,
        }
    }





    render() {
        return (
            <div className={'question'}>
                <p className={'title'}>
                    {this.state.item.name}
                </p>
            </div>
        );
    }
}

export default Index;