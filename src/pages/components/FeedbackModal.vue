<template>
    <Modal v-model="isShow" title="咨询效果反馈">
        <Form :model="form" :rules="rules" ref="form" :label-width="0" class="demo-ruleForm">

            <Form-item prop="content" label="">
                <Input type="textarea" placeholder="请输入反馈内容" :rows="5" :maxlength="500" v-model="form.content"></Input>
            </Form-item>

        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="isShow=false">取消</Button>
            <Button type="primary" size="large" @click="feedback">确定</Button>
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
                this.$refs.form.validate((valid) => {
                    if (valid) {

                        this.$Message.success("反馈成功！");
                        this.hide();
                        this.$emit('feedback')

                    }

                })


            },

            init() {

            },

        }
    }
</script>

