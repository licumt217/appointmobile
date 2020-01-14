<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >
                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="用户注册" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="registerForm" :label-width="80" class="demo-ruleForm">

                                <Form-item prop="phone" label="手机号">
                                    <Input  type="number" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                                </Form-item>

                                <Form-item prop="identification_no" label="身份证号">
                                    <Input  type="text" placeholder="请输入身份证号" v-model="formItem.identification_no"></Input>
                                </Form-item>

                                <Form-item prop="name" label="姓名">
                                    <Input placeholder="请输入姓名" :maxlength="20" v-model="formItem.name"></Input>
                                </Form-item>

                                <FormItem label="性别" prop="gender">
                                    <RadioGroup v-model="formItem.gender" vertical>
                                        <Radio label="male">男</Radio>
                                        <Radio label="female">女</Radio>
                                    </RadioGroup>
                                </FormItem>

                                <Form-item prop="email" label="电子邮箱">
                                    <Input placeholder="请输入电子邮箱" type="email" v-model="formItem.email"></Input>
                                </Form-item>

                                <FormItem label="出生日期" prop="birthday" >
                                    <DatePicker type="date" placeholder="请选择出生日期" @click.native="hideKbd" v-model="formItem.birthday" placement="top"></DatePicker>
                                </FormItem>

                            </Form>
                            <div class="login-btn">
                                <Button type="primary" @click="register">注册</Button>
                            </div>

                        </Tab-pane>
                        <Tab-pane label="咨询师登录" name="therapist" icon="android-person">

                            <Form :model="loginFormItem" :rules="loginRules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <Form-item prop="phone" label="手机号">
                                    <Input  type="number" placeholder="请输入手机号" v-model="loginFormItem.phone"></Input>
                                </Form-item>

                                <Form-item prop="password" label="密码">
                                    <Input  type="password" placeholder="请输入密码" v-model="loginFormItem.password"></Input>
                                </Form-item>


                            </Form>
                            <div class="login-btn">
                                <Button type="primary" @click="login">登录</Button>
                            </div>
                        </Tab-pane>
                    </Tabs>


                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                formItem: {
                },
                loginFormItem: {
                },
                rules: {
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {type: 'string', min: 11, message: '手机号长度不能少于11位', trigger: 'blur'}
                    ],
                    identification_no: [
                        {required: true, message: "身份证号不能为空", trigger: "blur"}
                    ],
                    gender: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    birthday: [
                        {required: true, type:"date",message: "出生日期不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
                loginRules: {
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"},
                        {type: 'string', min: 11, message: '手机号长度不能少于11位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                },
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if (this.isLogin) {
                // this.$router.push('/')
            }
        },
        methods: {
            hideKbd(e){
                e.target.blur()
            },
            /**
             * 已在pc端注册过的咨询师登录，进行账号关联
             */
            login(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        if(!Util.isValidPhone(this.loginFormItem.phone)){
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        this.loginFormItem.openid=sessionStorage.openid;

                        this.http.post('login/bind', this.loginFormItem).then((data) => {

                            this.$Message.success("登录成功")

                            sessionStorage.user_id=data.userInfo.user_id;
                            sessionStorage.token=data.token;

                            this.$router.push('/appoint/myAppoint')

                        }).catch(err => {
                            this.$Message.error(err)
                        })

                    }

                })
            },
            register() {

                this.$refs.registerForm.validate((valid) => {
                    if (valid) {

                        if(!Util.isValidPhone(this.formItem.phone)){
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if(!Util.isValidID(this.formItem.identification_no)){
                            this.$Message.warning("请输入合法的身份证号！")
                            return;
                        }

                        this.formItem.openid=sessionStorage.openid;

                        this.http.post('login/registerAndBind', this.formItem).then((data) => {

                            this.$Message.success("注册成功")

                            sessionStorage.user_id=data.userInfo.user_id;
                            sessionStorage.token=data.token;

                            //TODO 入口是哪个菜单，注册后需要跳转到具体菜单。

                            this.$router.push('/appoint/myAppoint')

                        }).catch(err => {
                            this.$Message.error(err)
                        })

                    }

                })

            },
        }
    }
</script>

<style scoped>
    .login-wrap {
        width: 100%;
        /*background: url("../../assets/images/bg-image.jpg");*/
        background-size: 100% 100%;
    }

    .mainContent {
        width:98%;
        margin-left: 1%;
        padding-top: 2em;
        height:100%;
    }



    .ms-login {
        width: 100%;
        overflow: scroll;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }


    .login-btn button {
        width: 100%;
        height: 36px;
    }



</style>
