import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Error, Auth } from './router'
import routers from "./router";

import Navigator from './components/Navigator'

import Util from "./assets/js/Util";
import store from "./store";
import ROLE from "./assets/js/constants/ROLE";
import './assets/css/App.less'

class App extends Component {

    constructor (props) {
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
                        }} />
                    )
                }

            } else {

                let code = Util.getUrlParam("code")

                if (!code) {
                    Util.fail('授权code不能为空!')
                    return <Redirect to={{
                        pathname: '/error'
                    }} />
                } else {

                    return <Auth path={path} {...props} />

                }


            }
        }

    }

    mockTherapist = () => {
        store.dispatch({
            type: 'user_id',
            payload: '49c3c3f285334868bf70f147bfd9b831'
        })

        store.dispatch({
            type: 'openid',
            payload: 'oNkDEvmRwbJ7VPew59gJkbPSQVvw'
        })

        store.dispatch({
            type: 'token',
            payload: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX2lkIjoiNDljM2MzZjI4NTMzNDg2OGJmNzBmMTQ3YmZkOWI4MzEiLCJwaG9uZSI6IjE4NjAxOTYwMDAxIiwibmFtZSI6IuW8oOWwj-WHoSIsImlkZW50aWZpY2F0aW9uX25vIjoiNDEwODgyMTk4ODAyMTcwMDAxIiwiZ2VuZGVyIjoibWFsZSIsImVtYWlsIjoiNDQ3ODE4MDAxQHFxLmNvbSIsImJpcnRoZGF5IjoiMjAxMC0wNi0yNSIsIm9wX2RhdGUiOiIyMDIwLTA2LTA5IDEwOjUyOjI4Iiwicm9sZSI6MywicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSJ9LCJpYXQiOjE1OTI3OTkwMzh9.tI6H2tdsQN_FGwgk620a_vspk7gujq2v_0TPdzxMK8U'
        })

        store.dispatch({
            type: 'role',
            payload: ROLE.therapist
        })

        store.dispatch({
            type: 'login',
            payload: true
        })
    }
    mock = () => {

        store.dispatch({
            type: 'user_id',
            payload: 'ce645425d808411eaee861ecdaf348c3'
        })

        store.dispatch({
            type: 'openid',
            payload: 'oNkDEvkobxGNXnlLyuV5IDqYQCMk'
        })

        store.dispatch({
            type: 'token',
            payload: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VyX2lkIjoiY2U2NDU0MjVkODA4NDExZWFlZTg2MWVjZGFmMzQ4YzMiLCJwaG9uZSI6IjE4MTAxMzYwMDAxIiwibmFtZSI6IuW8oOaXoOW_jCIsImlkZW50aWZpY2F0aW9uX25vIjoiNDEwODgyMTk4ODAyMTcwMDAxIiwiZ2VuZGVyIjoibWFsZSIsImVtYWlsIjoiNDQ3ODE4MDAxQHFxLmNvbSIsImJpcnRoZGF5IjoiMTk4OC0wNi0xMCIsIm9wX2RhdGUiOiIyMDIwLTA2LTEwIDE1OjQ3OjQ1Iiwicm9sZSI6NCwicGFzc3dvcmQiOm51bGx9LCJpYXQiOjE1OTIzMDM4ODN9.FQSlmw3Bi3Mvos8EdVJS6kG3fZdO8io9oD5hIXEA9ss'
        })

        store.dispatch({
            type: 'role',
            payload: ROLE.client
        })



        store.dispatch({
            type: 'login',
            payload: true
        })
    }
    render() {


        this.mock();
        // this.mockTherapist()


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
                    {/*<Navigator history={this.props.history}/>*/}

                    <Switch>

                        {
                            routers.map((item, index) => {

                                return <Route key={index} exact path={item.path}
                                    component={this.createComponent(item.component, item.path)} />
                            })
                        }

                        <Route exact path='/error' component={Error} />
                        <Route exact path='/auth' component={Auth} />

                        <Redirect to="/" />
                    </Switch>
                </Router>
            </section>
        );
    }
}

export default App;
