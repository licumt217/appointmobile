<template>


    <section class="">
        <div class="mainContent">
            <div class="ms-login">

                <Tabs value="myAppoint">
                    <TabPane label="我的预约" name="myAppoint">

                        <Card>
                            <p slot="title">当前预约</p><!---->
                            <p>预约名称：总是失眠咨询</p>
                            <p>预约地点：北京市五道口宇宙中心</p>
                            <p>预约时间：2019/12/20</p>
                            <p>咨询师：范冰冰</p>
                            <div style="margin-top: 1em;">
                                <Button @click="go2Detail" style="margin-right: 2em;">查看详情</Button>
                                <Button type="error" @click="cancel">取消预约</Button>
                            </div>
                        </Card>

                        <div style="margin-top: 1em;" >
                            <Row>
                                <Col span="10" offset="1">
                                    <Button type="primary" long @click="appoint">立即预约</Button>
                                </Col>
                                <Col span="10" offset="1">
                                    <Button type="success" long @click="emergencyConsult">紧急咨询</Button>
                                </Col>
                            </Row>
                        </div>

                    </TabPane>

                    <TabPane label="预约历史" name="appointHistory">

                        <Table border stripe :columns="columns12" :data="data6">
                            <template slot-scope="{ row }" slot="name">
                                <span @click="go2Detail">{{ row.name }}</span>
                            </template>
                        </Table>

                    </TabPane>

                    <TabPane label="设置" name="setting">

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


                    </TabPane>

                </Tabs>

            </div>




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
    import {Util} from '../assets/js/Util'

    export default {
        data() {
            return {
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
                    },
                    {
                        name: '周慧敏',
                        relation: '姐弟',
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
                columns12: [
                    {
                        title: '预约名称',
                        slot: 'name',
                    },
                    {
                        title: '预约日期',
                        key: 'date'
                    },
                ],
                data6: [
                    {
                        name: '心理很阴暗咨询1',
                        date: '2019/06/21',
                    }, {
                        name: '心理很阴暗咨询2',
                        date: '2019/06/21',
                    }, {
                        name: '心理很阴暗咨询3',
                        date: '2019/06/21',
                    }, {
                        name: '心理很阴暗咨询4',
                        date: '2019/06/21',
                    }, {
                        name: '心理很阴暗咨询5',
                        date: '2019/06/21',
                    },

                ]
            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            //紧急咨询
            emergencyConsult(){
                this.$router.push({
                    path:'/therapistList',
                    query:{
                        isEmergency:true
                    }
                })
            },
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
            appoint(){
                this.$router.push('/appointType')
            },


            cancel() {
                this.$Modal.confirm({
                    title: '您确定取消吗？',
                    content: '',
                    onOk: () => {
                        this.$Message.success("操作成功！");
                    },
                    onCancel: () => {
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
            go2Detail() {
                this.$router.push('/appointDetail')
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
    .login-wrap {
        position: relative;
        width: 100%;
        background-size: 100% 100%;
    }

    .mainContent {
        width: 98%;
        margin-left: 1%;
        margin-bottom: 5%;
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
