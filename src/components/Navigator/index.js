import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import {withRouter} from "react-router-dom";
import store from "../../store";

import './index.less'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

    clickHandler=(url)=>{

        store.dispatch({
            type:'menu_selected_index',
            payload: url
        })

        this.props.history.push(url)


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
                                        selected={!store.getState().menu_selected_index || store.getState().menu_selected_index==='/appoint/myAppoint'}
                                        onPress={this.clickHandler.bind(this,'/appoint/myAppoint')}
                                    >
                                    </TabBar.Item>
                                    <TabBar.Item
                                        title="预约历史"
                                        key="2"
                                        icon={<div className='icon icon-record'/>}
                                        selectedIcon={<div className='icon icon-record-selected'/>}
                                        selected={store.getState().menu_selected_index==='/appoint/history'}
                                        onPress={this.clickHandler.bind(this,'/appoint/history')}
                                    >
                                    </TabBar.Item>
                                    <TabBar.Item
                                        title="个人中心"
                                        key="3"
                                        icon={<div className='icon icon-center'/>}
                                        selectedIcon={<div className='icon icon-center-selected'/>}
                                        selected={store.getState().menu_selected_index==='/user/center'}
                                        onPress={this.clickHandler.bind(this,'/user/center')}
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