<template>


    <section class="">
        <div class="mainContent">
            <Table border stripe :columns="appointListColumns" :data="appointList">
                <template slot-scope="{ row }" slot="appoint_date">
                    <span @click="go2Detail(row)">{{ row.appoint_date }}</span>
                </template>
            </Table>




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
                this.getAppointList()
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
