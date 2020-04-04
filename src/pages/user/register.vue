<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >
                <div class="">

                    <Tabs type="card">
                        <Tab-pane label="用户注册" name="account" >

                            <Form :model="formItem" ref="registerForm" :label-width="80" class="demo-ruleForm">

                                <x-input :max=11 :placeholder="'请输入手机号'"
                                         placeholder-align="right" ref="phone"
                                         v-model="formItem.phone">

                                    <div slot="label" style="width:5em;">
                                        手机号<span style="color:red;">*</span>
                                    </div>
                                </x-input>

                                <x-input ref="" :placeholder="'请输入身份证号'" placeholder-align="right"
                                         v-model="formItem.identification_no">
                                    <div slot="label" style="width:5em;">
                                        身份证号<span style="color:red;">*</span>
                                    </div>
                                </x-input>

                                <x-input ref="" :placeholder="'请输入姓名'" placeholder-align="right"
                                         v-model="formItem.name">
                                    <div slot="label" style="width:5em;">
                                        姓名<span style="color:red;">*</span>
                                    </div>
                                </x-input>

                                <my-popup-picker placeholder="请选择性别" :data="sexOptions" :is-must="true" v-model="formItem.sex">性别</my-popup-picker>

                                <x-input ref="email" :placeholder="'请输入电子邮箱'" placeholder-align="right"
                                         v-model="formItem.email">
                                    <div slot="label" style="width:5em;">
                                        电子邮箱<span style="color:red;">*</span>
                                    </div>
                                </x-input>

                                <datetime :min-year="1900" v-model="formItem.birthday" ref="birthday" @on-show="scroll"
                                          :placeholder="'请选择出生日期'" placeholder-align="left">
                                    <div slot="title" style="width:5em;">
                                        出生日期<span style="color:red;">*</span>
                                    </div>
                                </datetime>

                            </Form>
                            <x-button class="long_btn" text="注册" type="primary" @click.native="register"></x-button>

                        </Tab-pane>
                        <Tab-pane label="咨询师登录" name="therapist" >

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
    import MyPopupPicker from '../../components/MyPopupPicker'
    export default {
        components:{
            MyPopupPicker
        },
        data() {
            return {
                sexOptions: [
                    {
                        value: 'male',
                        name: '男'
                    },
                    {
                        value: 'female',
                        name: '女'
                    },
                ],
                formItem: {
                },
                loginFormItem: {
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
            scroll(){
                document.body.scrollTop='1px'
                setTimeout(()=>{
                    document.body.scrollTop='2px'
                },200)
            },
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
            isValid() {
                if (!(this.formItem.phone && Util.isValidPhone(this.formItem.phone))) {
                    this.$vux.toast.text('请输入正确的手机号')
                    return false;
                }

                if (!(this.formItem.identification_no && Util.isValidID(this.formItem.identification_no))) {
                    this.$vux.toast.text('请输入正确身份证号')
                    return false;
                }

                if (!(this.formItem.name)) {
                    this.$vux.toast.text('请输入姓名')
                    return false;
                }
                if (!(this.formItem.sex)) {
                    this.$vux.toast.text('请选择性别')
                    return false;
                }

                if (!(this.formItem.email && Util.isValidEmail(this.formItem.email))) {
                    this.$vux.toast.text('请输入正确的电子邮箱')
                    return false;
                }

                if (!(this.formItem.birthday)) {
                    this.$vux.toast.text('请选择出生日期')
                    return false;
                }

                return true;
            },
            register() {
                if (this.isValid()) {
                    this.$router.push('/appoint/myAppoint')
                    return;

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
        padding: 5px;
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
