<template>
    <Modal v-model="isShow" fullscreen title="紧急咨询原因">
        <Form :model="form" :rules="rules" ref="form" :label-width="0" class="demo-ruleForm">

            <Form-item prop="content" label="">
                <Input type="textarea" placeholder="请输入紧急咨询原因" :rows="18" :maxlength="500" v-model="form.content"></Input>
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
                        {required: true, message: "请输入紧急咨询原因", trigger: "blur"}
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
                this.$refs.form.validate((valid) => {
                    if (valid) {

                        this.hide();
                        this.$emit('consult')

                    }

                })


            },

            init() {

            },

        }
    }
</script>

