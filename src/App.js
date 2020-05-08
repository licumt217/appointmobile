import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Error, Auth} from './router'
import routers from "./router";

import Navigator from './components/Navigator'

import Util from "./assets/js/Util";
import store from "./store";
import './assets/css/App.less'

class App extends Component {

    constructor(props) {
        super(props);
    }

    createComponent = (TheComponent, path) => (props) => {

        if (store.getState().user_id) {

            return <TheComponent {...props} />

        } else {

            if (store.getState().openid) {

                if (props.location.pathname === '/user/register') {
                    return <TheComponent {...props} />
                } else {
                    return (
                        <Redirect to={{
                            pathname: '/user/register'
                        }}/>
                    )
                }

            } else {

                let code = Util.getUrlParam("code")

                if (!code) {
                    Util.fail('授权code不能为空!')
                    return <Redirect to={{
                        pathname: '/error'
                    }}/>
                } else {

                    return <Auth path={path} {...props} />

                }


            }
        }

    }

    mock=()=>{
        store.dispatch({
            type:'user_id',
            payload: '0ca990eb46074e34a896edbeba3039ff'
        })

        store.dispatch({
            type:'openid',
            payload: 'oNkDEvkobxGNXnlLyuV5IDqYQCMk'
        })

        store.dispatch({
            type:'token',
            payload: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX2lkIjoiMGNhOTkwZWI0NjA3NGUzNGE4OTZlZGJlYmEzMDM5ZmYiLCJwaG9uZSI6IjE1OTAwMDAwMDAzIiwibmFtZSI6IuWSqOivouW4iDAwMyIsImlkZW50aWZpY2F0aW9uX25vIjoiNDEwODgyMTk4ODAyMTc4ODgxIiwiZ2VuZGVyIjoibWFsZSIsImVtYWlsIjoiMjMyM0AxMjYuY29tIiwiYmlydGhkYXkiOiIyMDI3LTA0LTA2Iiwib3BfZGF0ZSI6IjIwMjAtMDUtMDcgMTg6MzY6MzgiLCJyb2xlIjozLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIn0sImlhdCI6MTU4ODkwNDk5NX0.nYEPye1FYL4Jm-DDyNCCuBrEE2OrRFiaU2kxLAABEmg'
        })

        store.dispatch({
            type:'role',
            payload: 3
        })



        store.dispatch({
            type:'login',
            payload:true
        })
    }
    render() {


        // this.mock();



        //验证openid是否和手机号绑定了

        // user_id = "0ca990eb46074e34a896edbeba3039ff"
        //
        // openid = "oNkDEvkobxGNXnlLyuV5IDqYQCMk"
        //
        //
        // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX2lkIjoiMGNhOTkwZWI0NjA3NGUzNGE4OTZlZGJlYmEzMDM5ZmYiLCJwaG9uZSI6IjE1OTAwMDAwMDAzIiwibmFtZSI6IuWSqOivouW4iDAwMyIsImlkZW50aWZpY2F0aW9uX25vIjoiNDEwODgyMTk4ODAyMTc4ODgxIiwiZ2VuZGVyIjoibWFsZSIsImVtYWlsIjoiMjMyM0AxMjYuY29tIiwiYmlydGhkYXkiOiIyMDIwLTA0LTA2Iiwib3BfZGF0ZSI6IjIwMjAtMDQtMTEgMTU6Mzg6NTUiLCJyb2xlIjozLCJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIn0sImlhdCI6MTU4NjU5OTg3MX0.YGF-FimeSOpPn4AXWWPUzjVFL4mNSDOXgWv08Gwpt1w"
        //
        //
        // // 咨询师
        // user_id='08aa8d5dd80041a287374eccf9736b15';



        return (
            <section className='base-container'>

                <Router basename={'/appointmobile/'}>
                    <Navigator history={this.props.history}/>

                    <Switch>

                        {
                            routers.map((item, index) => {

                                return <Route key={index} exact path={item.path}
                                              component={this.createComponent(item.component, item.path)}/>
                            })
                        }

                        <Route exact path='/error' component={Error}/>
                        <Route exact path='/auth' component={Auth}/>

                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </section>
        );
    }
}

export default App;
