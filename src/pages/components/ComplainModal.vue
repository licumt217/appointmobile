<template>

    <popup v-model="isShow" height="45%">

        <Divider>{{user_type==='therapist'?'投诉用户':'投诉咨询师'}}</Divider>

        <x-textarea :max="200" :rows="6" v-model="form.content" placeholder="请输入投诉内容"></x-textarea>

        <flexbox style="margin-top: .5em;">
            <flexbox-item style="text-align: center">
                <x-button plain @click.native="isShow=false">取消</x-button>
            </flexbox-item>
            <flexbox-item style="text-align: center">
                <x-button plain type="primary" @click.native="complain">确定</x-button>
            </flexbox-item>
        </flexbox>


    </popup>

</template>

<script>
    export default {
        name: '',
        data() {
            return {
                isShow: false,
                form: {},
                rules: {
                    content: [
                        {required: true, message: "请输入投诉内容", trigger: "blur"}
                    ],
                },
                user_type: ''
            }
        },
        props: {
            order_id: {
                type: String,
                default: ''
            }
        },
        computed: {},
        watch: {},
        methods: {
            show(user_type) {
                this.user_type = user_type
                this.isShow = true;
            },
            hide() {
                this.isShow = false;
            },
            complain() {
                //TODO 投诉接口。弹窗时是否需要回显？

                if (this.form.content) {

                    this.http.post('complaint/add', {
                        order_id: this.order_id,
                        content: this.form.content,
                        user_type: this.user_type
                    }).then((data) => {
                        this.$vux.toast.text('投诉成功')
                        this.hide();
                        // this.$emit('complain')

                    }).catch(err => {
                        this.$vux.toast.text(err)
                    })


                } else {
                    this.$vux.toast.text('请输入投诉内容')
                }

            },

            init() {

            },

        }
    }
</script>

