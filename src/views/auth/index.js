import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {ActivityIndicator,Flex} from 'antd-mobile'
import Util from "../../assets/js/Util";
import {getOpenid, getUserByOpenid} from "../../http/service";
import store from "../../store";

class Index extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.login()

    }

    goError=()=>{
        this.props.history.push('/error')
    }

    goRegister=()=>{
        this.props.history.push('/user/register')
    }


    login = () => {



        let code = Util.getUrlParam("code")
        getOpenid({
            code: code
        }).then((openid) => {

            store.dispatch({
                type:'openid',
                payload: openid
            })


            getUserByOpenid({
                openid
            }).then((data) => {

                if (data) {

                    store.dispatch({
                        type:'user_id',
                        payload: data.userInfo.user_id
                    })

                    store.dispatch({
                        type:'token',
                        payload: data.token
                    })

                    store.dispatch({
                        type:'role',
                        payload: data.userInfo.role
                    })

                    store.dispatch({
                        type:'login',
                        payload:true
                    })

                    this.props.history.push(this.props.path)

                } else {

                    this.goRegister()

                }

            },err=>{
                Util.fail(err)
                this.goError()
            }).catch(err => {
                Util.fail(err)
                this.goError()
            })

        },err=>{
            Util.fail(err)
            this.goError()
        }).catch(err => {
            Util.fail(err)
            this.goError()
        })
    }

    render() {
        return (
                    <ActivityIndicator toast text={"Loading..."}/>

        );
    }
}

export default Index;