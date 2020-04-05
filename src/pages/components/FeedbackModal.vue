<template>

    <popup v-model="isShow" height="45%">

        <Divider>咨询效果反馈</Divider>

        <x-textarea :max="200" :rows="6" v-model="form.content" placeholder="请输入反馈内容"></x-textarea>

        <flexbox style="margin-top: .5em;">
            <flexbox-item style="text-align: center">
                <x-button plain @click.native="isShow=false">取消</x-button>
            </flexbox-item>
            <flexbox-item style="text-align: center">
                <x-button plain type="primary" @click.native="feedback">确定</x-button>
            </flexbox-item>
        </flexbox>


    </popup>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                isShow:false,
                form:{},
                rules: {
                    content: [
                        {required: true, message: "请输入反馈内容", trigger: "blur"}
                    ],
                },
            }
        },
        props: {
        },
        computed: {},
        watch:{
        },
        methods: {
            show(){
              this.isShow=true;
            },
            hide(){
              this.isShow=false;
            },
            feedback() {
                //TODO 反馈接口。弹窗时是否需要回显？
                if(this.form.content){
                    this.$vux.toast.text('反馈成功')
                    this.hide();
                    this.$emit('feedback')
                }else{
                    this.$vux.toast.text('请输入反馈内容')
                }

            },

            init() {

            },

        }
    }
</script>

