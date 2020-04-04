<template>
    <popup v-model="isShow" height="45%">

        <Divider>新增紧急联系人</Divider>

        <MyInput v-model="form.name" is-must placeholder="请输入姓名">姓名</MyInput>
        <MyInput v-model="form.relation" is-must placeholder="请输入关系">关系</MyInput>
        <MyInput v-model="form.phone" is-must placeholder="请输入手机号" :max="11">手机号</MyInput>
        <MyInput v-model="form.email" is-must placeholder="请输入电子邮箱">电子邮箱</MyInput>


        <flexbox style="margin-top: .5em;">
            <flexbox-item>
                <x-button class="long_btn" mini plain @click.native="isShow=false">取消</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button class="long_btn" mini plain type="primary" @click.native="operate">确定</x-button>
            </flexbox-item>
        </flexbox>


    </popup>
</template>
<script>
    import {Util} from "../assets/js/Util";
    import MyInput from './MyInput'

    export default {
        components:{
            MyInput
        },
        data() {
            return {
                isShow:false,
                form:{

                }
            }
        },
        methods: {
            isValid() {

                if (!(this.form.name)) {
                    this.$vux.toast.text('请输入姓名')
                    return false;
                }

                if (!(this.form.relation)) {
                    this.$vux.toast.text('请输入关系')
                    return false;
                }

                if (!(this.form.phone && Util.isValidPhone(this.form.phone))) {
                    this.$vux.toast.text('请输入正确的手机号')
                    return false;
                }

                if (!(this.form.email && Util.isValidEmail(this.form.email))) {
                    this.$vux.toast.text('请输入正确的电子邮箱')
                    return false;
                }

                return true;
            },
            show(form){
                if(form){
                    this.form=form;
                }
                this.isShow=true;
            },
            hide(){
                this.isShow=false;
            },
            operate() {

                if (this.isValid()) {


                    let url = 'emergencyContack/add'
                    if (this.form.emergency_contack_id) {
                        url = 'emergencyContack/update'
                    }

                    this.http.post(url, this.form).then((data) => {

                        this.$vux.toast.text('操作成功!')
                        this.hide();
                        this.$emit('done')

                    }).catch(err => {
                        this.$vux.toast.text(err)
                    })


                }

            },
        },
    }
</script>