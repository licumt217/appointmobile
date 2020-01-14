<template>


    <section class="">
        <div class="mainContent">
            <Card>
                <p slot="title">当前预约</p>
                <template v-if="curAppoint">
                    <p>预约日期：{{curAppoint.appoint_date}}</p>
                    <p>预约时段：{{Util.getAppointPeriodStrFromArray(curAppoint)}}</p>
                    <p>咨询师：{{curAppoint.name}}</p>
                    <div style="margin-top: 1em;">
                        <Button @click="go2Detail(curAppoint)" style="margin-right: 2em;">查看详情</Button>
                        <Button type="error" @click="cancel">取消预约</Button>
                    </div>
                </template>
                <template v-else>
                    <h3>暂无预约</h3>
                </template>
            </Card>

            <div style="margin-top: 1em;" >
                <Row>
                    <Col span="7" offset="1">
                        <Button type="primary" long @click="appoint">立即预约</Button>
                    </Col>
                    <Col span="7" offset="1">
                        <Button type="success" long @click="emergencyConsult">紧急咨询</Button>
                    </Col>

                    <Col span="7" offset="1">
                        <Button type="warning" long @click="transfer">转介</Button>
                    </Col>

                </Row>
            </div>




        </div>


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
            this.init()
        },
        methods: {


            getAppointList(){
                this.http.post('order/getAppointHistory', {
                    openid:sessionStorage.openid,
                }).then((data) => {
                    this.appointList=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            init(){
                this.getCurAppoint()
            },
            /**
             * 获取当前预约
             * */
            getCurAppoint(){
                this.http.post('order/getCurAppoint', {
                    openid:sessionStorage.openid
                }).then((data) => {
                    this.curAppoint=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            /**
             * 转介
             */
            transfer(){

                this.$router.push({
                    path:'/therapistListWithTransfer',
                    query:{
                    }
                })
            },
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
            appoint(){
                if(this.curAppoint){
                    this.$Message.warning("您有进行中的预约！")
                    return;
                }
                this.$router.push('/consultType')
            },


            cancel() {
                this.$Modal.confirm({
                    title: '您确定取消吗？',
                    content: '',
                    onOk: () => {
                        this.http.post('order/cancelOrder', {
                            order_id:this.curAppoint.order_id
                        }).then((data) => {
                            this.curAppoint=data;
                            this.$Message.success('操作成功')
                            this.init()

                        }).catch(err => {
                            this.$Message.error(err)
                        })
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
            go2Detail(order) {
                this.$router.push({
                    path:'/appointDetail',
                    query:{
                        order_id:order.order_id
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
