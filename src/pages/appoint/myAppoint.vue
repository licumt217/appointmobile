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
                formItem: {},
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {



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
            appoint(){
                if(this.curAppoint){
                    this.$Message.warning("您有进行中的预约！")
                    return;
                }
                this.$router.push('/steps/step1')
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

            go2Detail(order) {
                this.$router.push({
                    path:'/appoint/detail',
                    query:{
                        order_id:order.order_id
                    }
                })
            },
            back() {
                this.$router.go(-1)
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
