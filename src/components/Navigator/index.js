import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import {withRouter} from "react-router-dom";
import store from "../../store";

import './index.less'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            hidden: false,
            fullScreen: false,
            login:store.getState().login
        }

        store.subscribe(()=>{
            const state=store.getState();
            this.setState({
                login:state.login
            })

        })
    }

    clickHandler=(index)=>{
        this.setState({
            selectedIndex: index
        });

        switch (index) {
            case 0:
                this.props.history.push('/appoint/myAppoint')
                break;
            case 1:
                this.props.history.push('/appoint/history')
                break;
            case 2:
                this.props.history.push('/user/center')
                break;
        }


    }


    render() {
        return (
            <React.Fragment>
                {
                    this.state.login?
                        (
                            <div className='myTabBar'>
                                <TabBar

                                    unselectedTintColor="#949494"
                                    tintColor="#33A3F4"
                                    barTintColor="white"
                                >
                                    <TabBar.Item
                                        title="我的预约"
                                        key="1"
                                        icon={<div className='icon icon-myappoint'/>}
                                        selectedIcon={<div className='icon icon-myappoint-selected'/>}
                                        selected={this.state.selectedIndex===0}
                                        onPress={this.clickHandler.bind(this,0)}
                                    >
                                    </TabBar.Item>
                                    <TabBar.Item
                                        title="预约记录"
                                        key="2"
                                        icon={<div className='icon icon-record'/>}
                                        selectedIcon={<div className='icon icon-record-selected'/>}
                                        selected={this.state.selectedIndex===1}
                                        onPress={this.clickHandler.bind(this,1)}
                                    >
                                    </TabBar.Item>
                                    <TabBar.Item
                                        title="个人中心"
                                        key="3"
                                        icon={<div className='icon icon-center'/>}
                                        selectedIcon={<div className='icon icon-center-selected'/>}
                                        selected={this.state.selectedIndex===2}
                                        onPress={this.clickHandler.bind(this,2)}
                                    >
                                    </TabBar.Item>


                                </TabBar>
                            </div>
                        )
                        :null
                }
            </React.Fragment>
        );
    }
}

export default withRouter(Index);