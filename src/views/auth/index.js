import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {ActivityIndicator,Flex} from 'antd-mobile'
import Util from "../../assets/js/Util";
import {getOpenid, getUserByOpenid} from "../../http/service";

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

            sessionStorage.openid = openid;

            getUserByOpenid({
                openid
            }).then((data) => {

                if (data) {

                    sessionStorage.user_id = data.userInfo.user_id
                    sessionStorage.token = data.token
                    sessionStorage.user_type = data.userInfo.user_type;

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