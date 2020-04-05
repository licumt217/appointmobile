<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div >

                <Tabs type="card">
                    <Tab-pane label="用户注册" name="account">


                        <MyInput :max=11 :placeholder="'请输入手机号'" is-must v-model="formItem.phone">手机号</MyInput>

                        <MyInput :placeholder="'请输入身份证号'" is-must v-model="formItem.identification_no">身份证号
                        </MyInput>

                        <MyInput :placeholder="'请输入姓名'" is-must v-model="formItem.name">姓名</MyInput>

                        <my-popup-picker placeholder="请选择性别" :data="sexOptions" :is-must="true"
                                         v-model="formItem.sex">性别
                        </my-popup-picker>

                        <MyInput :placeholder="'请输入电子邮箱'" is-must v-model="formItem.email">电子邮箱</MyInput>

                        <MyDatetime v-model="formItem.birthday" :placeholder="'请选择出生日期'" is-must>出生日期
                        </MyDatetime>


                        <x-button class="long_btn" plain type="primary" @click.native="register">注册</x-button>

                    </Tab-pane>

                    <Tab-pane label="咨询师登录" name="therapist">


                        <MyInput :max=11 :placeholder="'请输入手机号'" is-must v-model="loginFormItem.phone">手机号
                        </MyInput>

                        <MyInput :max=5 :placeholder="'请输入密码'" is-password is-must v-model="loginFormItem.password">密码
                        </MyInput>

                        <x-button class="long_btn" plain type="primary" @click.native="login">登录</x-button>
                    </Tab-pane>

                </Tabs>


            </div>
        </transition>
    </div>

</template>

<script>
    const md5 = require('md5')
    import {Util} from '../../assets/js/Util'
    import MyPopupPicker from '../../components/MyPopupPicker'
    import MyDatetime from '../../components/MyDatetime'
    import MyInput from '../../components/MyInput'

    export default {
        components: {
            MyPopupPicker,
            MyInput,
            MyDatetime
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
                formItem: {},
                loginFormItem: {},
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
            scroll() {
                document.body.scrollTop = '1px'
                setTimeout(() => {
                    document.body.scrollTop = '2px'
                }, 200)
            },
            hideKbd(e) {
                e.target.blur()
            },
            isValidWhenLogin() {
                if (!(this.loginFormItem.phone && Util.isValidPhone(this.loginFormItem.phone))) {
                    this.$vux.toast.text('请输入正确的手机号')
                    return false;
                }

                if (!(this.loginFormItem.password)) {
                    this.$vux.toast.text('请输入密码')
                    return false;
                }


                return true;
            },
            /**
             * 已在pc端注册过的咨询师登录，进行账号关联
             */
            login() {
                if (this.isValidWhenLogin()) {

                    return;

                    this.loginFormItem.openid = sessionStorage.openid;

                    this.http.post('login/bind', this.loginFormItem).then((data) => {

                        this.$Message.success("登录成功")

                        sessionStorage.user_id = data.userInfo.user_id;
                        sessionStorage.token = data.token;

                        this.$router.push('/appoint/myAppoint')

                    }).catch(err => {
                        this.$Message.error(err)
                    })

                }

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

                    this.formItem.openid = sessionStorage.openid;

                    this.http.post('login/registerAndBind', this.formItem).then((data) => {

                        this.$Message.success("注册成功")

                        sessionStorage.user_id = data.userInfo.user_id;
                        sessionStorage.token = data.token;

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
