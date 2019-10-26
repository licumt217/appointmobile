<template>
    <Modal v-model="isShow" title="投诉咨询师">
        <Form :model="form" :rules="rules" ref="form" :label-width="0" class="demo-ruleForm">

            <Form-item prop="content" label="">
                <Input type="textarea" placeholder="请输入投诉内容" :rows="5" :maxlength="500" v-model="form.content"></Input>
            </Form-item>

        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="isShow=false">取消</Button>
            <Button type="primary" size="large" @click="complain">确定</Button>
        </div>
    </Modal>
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
                        {required: true, message: "请输入投诉内容", trigger: "blur"}
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
            complain() {
                //TODO 投诉接口。弹窗时是否需要回显？
                this.$refs.form.validate((valid) => {
                    if (valid) {

                        this.$Message.success("投诉成功！");
                        this.hide();
                        this.$emit('complain')

                    }

                })


            },

            init() {

            },

        }
    }
</script>

