<template>


    <section class="">
        <div class="mainContent">
            <Collapse v-model="setting" accordion>
                <Panel name="emergencyPerson">
                    紧急联系人设置
                    <div slot="content">
                        <Card v-for="person in emergencyPersonList" style="margin-bottom: 0.5em;">
                            <p slot="title">
                                {{person.name}}
                            </p>
                            <p>关系：{{person.relation}}</p>
                            <p>手机号：{{person.phone}}</p>
                            <p>电子邮件：{{person.email}}</p>
                            <Row style="">
                                <Col span="6" offset="17">
                                    <Button type="error" ghost size="small" @click="deletePerson">
                                        删除联系人
                                    </Button>
                                </Col>
                            </Row>

                        </Card>
                        <Row v-show="emergencyPersonList.length<3">
                            <Col span="6" offset="18">
                                <Button type="primary" size="small" @click="showAddPersonModal">添加联系人
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Panel>
                <Panel name="2">
                    其它设置
                    <p slot="content">
                        斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                    </p>
                </Panel>
            </Collapse>




        </div>

        <Modal v-model="isShowAddPersonModal" fullscreen title="添加紧急联系人">
            <Form :model="emergencyForm" :rules="rules" ref="emergencyForm" :label-width="80" class="demo-ruleForm">

                <Form-item prop="emergency_name" label="姓名">
                    <Input placeholder="请输入姓名" :maxlength="20" v-model="emergencyForm.emergency_name"></Input>
                </Form-item>

                <Form-item prop="emergency_relation" label="关系">
                    <Input placeholder="请输入关系" v-model="emergencyForm.emergency_relation"></Input>
                </Form-item>

                <Form-item prop="emergency_phone" label="手机号">
                    <Input type="number" placeholder="请输入手机号" v-model="emergencyForm.emergency_phone"></Input>
                </Form-item>

                <Form-item prop="emergency_email" label="电子邮箱">
                    <Input placeholder="请输入电子邮箱" type="email" v-model="emergencyForm.emergency_email"></Input>
                </Form-item>


            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowAddPersonModal=false">取消</Button>
                <Button type="primary" size="large" @click="addPerson">确定</Button>
            </div>
        </Modal>

    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    const ORDER_STATE =require('../../assets/js/constants/ORDER_STATE')

    export default {
        data() {
            return {
                Util,
                curAppoint:null,
                isShowAddPersonModal: false,
                emergencyPersonList: [
                    {
                        name: '张三',
                        relation: '朋友',
                        phone: '18601965856',
                        email: '447818666@qq.com'
                    },
                    {
                        name: '范冰冰',
                        relation: '兄妹',
                        phone: '18601965856',
                        email: '447818666@qq.com'
                    }
                ],
                setting: 'emergencyPerson',
                formItem: {},
                emergencyForm: {},
                rules: {
                    sex: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                    emergency_name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"}
                    ],
                    emergency_relation: [
                        {required: true, message: "关系不能为空", trigger: "blur"}
                    ],
                    emergency_phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"}
                    ],
                    emergency_email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
                appointListColumns: [
                    {
                        title: '预约日期',
                        slot: 'appoint_date',
                    },
                    {
                        title: '咨询师名称',
                        key: 'name'
                    },
                ],
                appointList: [
                ],
                descMap:{
                    period1:'08:00-08:50',
                    period2:'09:00-09:50',
                    period3:'10:00-10:50',
                    period4:'11:00-11:50',
                    period5:'13:00-13:50',
                    period6:'14:00-14:50',
                    period7:'15:00-15:50',
                    period8:'16:00-16:50',
                }
            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            showAddPersonModal() {
                this.isShowAddPersonModal = true;
            },
            addPerson() {

                this.$refs.emergencyForm.validate((valid) => {
                    if (valid) {

                        if (!Util.isValidPhone(this.emergencyForm.emergency_phone)) {
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if (!Util.isValidEmail(this.emergencyForm.emergency_email)) {
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }
                        this.$Message.success("添加成功！")
                        this.isShowAddPersonModal = false;

                    }

                })

            },

            deletePerson() {
                this.$Modal.confirm({
                    title: '您确定删除吗？',
                    content: '',
                    onOk: () => {
                        this.$Message.success("操作成功！");
                        this.emergencyPersonList.splice(0, 1)
                    },
                    onCancel: () => {
                    }
                })
            },
            back() {
                this.$router.go(-1)
            },
            operate() {

                this.$router.push('/user/myAppoint')

            },


        }
    }
</script>

<style scoped>

    .mainContent {
        width: 97%;
        margin:0 auto;
    }






</style>
