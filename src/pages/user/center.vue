<template>


    <div class="login-wrap">
        <Form :model="formItem" :rules="rules" ref="registerForm" :label-width="80" class="demo-ruleForm">

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

            <my-popup-picker placeholder="请选择性别" :data="sexOptions" :is-must="true" v-model="formItem.gender">性别
            </my-popup-picker>

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
        <x-button class="long_btn" type="primary" @click.native="update">修改</x-button>
    </div>

</template>

<script>
    const md5 = require('md5')
    import {Util} from '../../assets/js/Util'
    import MyPopupPicker from '../../components/MyPopupPicker'

    export default {
        components: {
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
                formItem: {},
                loginFormItem: {},
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
                        {required: true, type: "date", message: "出生日期不能为空", trigger: "change"}
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
            this.getById();
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
            /**
             * 已在pc端注册过的咨询师登录，进行账号关联
             */
            getById() {
                this.http.post('user/getById').then((data) => {

                    this.formItem = data;


                }).catch(err => {
                    this.$Message.error(err)
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
                if (!(this.formItem.gender)) {
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
            update() {
                if (this.isValid()) {
                    this.formItem.openid = sessionStorage.openid;

                    let url = 'user/update'

                    this.http.post(url, this.formItem).then((data) => {

                        this.$Message.success("修改成功")


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
        width: 98%;
        margin-left: 1%;
        padding-top: 2em;
        height: 100%;
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
