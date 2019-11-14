<template>


    <div class="">
        <Card>

            <p slot="title">预约详情</p>
            <p>预约日期：{{order.appoint_date}}</p>
            <p>预约时段：{{Util.getAppointPeriodStrFromArray(order)}}</p>
            <p>咨询师：{{order.name}}</p>
            <p>订单状态：{{ORDER_STATE_DESC[order.state]}}</p>
            <!--            可能需要用户的一些基本信息-->

        </Card>
        <div style="margin:1em auto 0 auto;" v-if="order.state===ORDER_STATE.COMMIT">
            <Button @click="accept">接受咨询</Button>
            <Button type="success" @click="deny">拒绝咨询 </Button>

        </div>

        <div style="margin:1em auto 0 auto;" v-if="order.state===ORDER_STATE.DONE">
            <Button @click="done">确认完成</Button>

        </div>


    </div>

</template>

<script>
    import {Util} from '../../../assets/js/Util'

    const ORDER_STATE_DESC = require('../../../assets/js/constants/ORDER_STATE_DESC')
    const ORDER_STATE = require('../../../assets/js/constants/ORDER_STATE')
    export default {
        components: {},
        data() {
            return {
                ORDER_STATE_DESC,
                ORDER_STATE,
                Util,
                order_id: this.$route.query.order_id,
                order: {},
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getAppointDetail()
            },

            getAppointDetail() {
                this.http.post('order/getAppointDetail', {
                    order_id: this.order_id
                }).then((data) => {
                    this.order = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            accept(){
                this.http.post('order/accept', {
                    order_id: this.order_id
                }).then((data) => {
                    this.$Message.success('操作成功！')
                    this.init()

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            deny(){
                this.http.post('order/deny', {
                    order_id: this.order_id
                }).then((data) => {
                    this.$Message.success('操作成功！')
                    this.init()

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            done(){
                this.http.post('order/done', {
                    order_id: this.order_id
                }).then((data) => {
                    this.$Message.success('操作成功！')
                    this.init()

                }).catch(err => {
                    this.$Message.error(err)
                })
            }


        }
    }
</script>

<style scoped>


</style>
