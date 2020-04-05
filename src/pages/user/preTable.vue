<template>


    <div class="">
        <transition name="slideT">
            <div  >
                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="填写预检表" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <FormItem label="性别" prop="sex">
                                    <RadioGroup v-model="formItem.sex" vertical>
                                        <Radio label="male" >男</Radio>
                                        <Radio label="female" >女</Radio>
                                    </RadioGroup>
                                </FormItem>

                                <Form-item prop="email" label="电子邮箱">
                                    <Input  :maxlength="30" placeholder="请输入电子邮箱" v-model="formItem.email"></Input>
                                </Form-item>

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <div class="login-btn">
                        <Button type="primary" @click="operate">确定</Button>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                formItem: {
                },
                rules: {
                    sex: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            hideKbd(e){
                e.target.blur()
            },
            back(){
                this.$router.go(-1)
            },
            operate() {

                this.$router.push('/myAppoint')

            },




        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        background-size: 100% 100%;
    }



    .ms-login {
        overflow: hidden;
        padding: 10px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }

    .signup-btn {
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }



</style>
