<template>


    <section class="">
            <Collapse accordion>
                <Panel name="emergencyPerson">
                    紧急联系人设置
                    <div slot="content">
                        <Card v-for="person in list" style="margin-bottom: 0.5em;">
                            <p slot="title">
                                {{person.name}}
                            </p>
                            <p>关系：{{person.relation}}</p>
                            <p>手机号：{{person.phone}}</p>
                            <p>电子邮件：{{person.email}}</p>
                            <Row style="">
                                <Col span="8" offset="8">
                                    <Button type="error" ghost size="small" @click="remove(person)">
                                        删除联系人
                                    </Button>
                                </Col>
                                <Col span="8" >
                                    <Button type="primary" ghost size="small" @click="showModal(person)">
                                        修改联系人
                                    </Button>
                                </Col>
                            </Row>

                        </Card>
                        <Row v-show="list.length<3">
                            <Col span="6" offset="12">
                                <Button type="primary" size="small" @click="showModal(0)">添加联系人
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



        <Modal v-model="isShowAddPersonModal" fullscreen title="添加紧急联系人">
            <Form :model="emergencyForm" :rules="rules" ref="emergencyForm" :label-width="80" class="demo-ruleForm">

                <Form-item prop="name" label="姓名">
                    <Input placeholder="请输入姓名" :maxlength="20" v-model="emergencyForm.name"></Input>
                </Form-item>

                <Form-item prop="relation" label="关系">
                    <Input placeholder="请输入关系" v-model="emergencyForm.relation"></Input>
                </Form-item>

                <Form-item prop="phone" label="手机号">
                    <Input type="number" placeholder="请输入手机号" v-model="emergencyForm.phone"></Input>
                </Form-item>

                <Form-item prop="email" label="电子邮箱">
                    <Input placeholder="请输入电子邮箱" type="email" v-model="emergencyForm.email"></Input>
                </Form-item>


            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowAddPersonModal=false">取消</Button>
                <Button type="primary" size="large" @click="operate">确定</Button>
            </div>
        </Modal>

    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'

    export default {
        data() {
            return {
                isShowAddPersonModal: false,
                list: [],
                emergencyForm: {},
                rules: {
                    name: [
                        {required: true, message: "姓名不能为空", trigger: "blur"}
                    ],
                    relation: [
                        {required: true, message: "关系不能为空", trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "手机号不能为空", trigger: "blur"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getList()
            },
            getList() {
                this.http.post('emergencyContack/list', {
                    user_id: sessionStorage.user_id
                }).then((data) => {

                    this.list = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            showModal(person) {
                this.emergencyForm={}
                if(person){
                    this.emergencyForm=person
                }
                this.isShowAddPersonModal = true;
            },
            operate() {

                this.$refs.emergencyForm.validate((valid) => {
                    if (valid) {

                        if (!Util.isValidPhone(this.emergencyForm.phone)) {
                            this.$Message.warning("请输入合法的手机号！")
                            return;
                        }

                        if (!Util.isValidEmail(this.emergencyForm.email)) {
                            this.$Message.warning("请输入合法的电子邮箱！")
                            return;
                        }

                        let url='emergencyContack/add'
                        if(this.emergencyForm.emergency_contack_id){
                            url='emergencyContack/update'
                        }

                        this.http.post(url, this.emergencyForm).then((data) => {

                            this.$Message.success("操作成功！")
                            this.isShowAddPersonModal = false;
                            this.init();

                        }).catch(err => {
                            this.$Message.error(err)
                        })


                    }

                })

            },

            remove(person) {
                this.$Modal.confirm({
                    title: '您确定删除吗？',
                    content: '',
                    onOk: () => {
                        this.http.post('emergencyContack/delete', {
                            emergency_contack_id:person.emergency_contack_id
                        }).then((data) => {
                            this.$Message.success("操作成功！");
                            this.init();

                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    },
                    onCancel: () => {
                    }
                })
            },


        }
    }
</script>

<style scoped>

    .mainContent {
        width: 97%;
        margin: 0 auto;
    }


</style>
