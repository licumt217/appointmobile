<template>


    <div class="">
        <Card>

            <p slot="title">预约详情</p>
            <p>预约日期：{{order.appoint_date}}</p>
            <p>预约时段：{{Util.getAppointPeriodStrFromArray(order)}}</p>
            <p>咨询师：{{order.name}}</p>
            <p>预约状态：{{ORDER_STATE_DESC[order.state]}}</p>

        </Card>
        <div style="margin:1em auto 0 auto;">
            <Button v-if="order.state===ORDER_STATE.AUDITED" type="primary" @click="pay">立即支付</Button>
            <Button v-if="order.state===ORDER_STATE.COMMIT || order.state===ORDER_STATE.AUDITED || order.state===ORDER_STATE.PAYED" type="success"
                    @click="cancel">取消预约
            </Button>
            <Button v-if="order.state===ORDER_STATE.DONE " type="warning" @click="showFeedbackModal">咨询效果反馈</Button>
            <Button v-if="order.state===ORDER_STATE.DONE " :order_id="order.order_id" type="error" @click="showComplainModal">投诉咨询师</Button>

        </div>

        <ComplainModal ref="complainModal" ></ComplainModal>
        <FeedbackModal ref="feedbackModal" @feedback="feedback"></FeedbackModal>


    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {PayUtil} from '../../assets/js/PayUtil'
    const ORDER_STATE_DESC = require('../../assets/js/constants/ORDER_STATE_DESC')
    const ORDER_STATE = require('../../assets/js/constants/ORDER_STATE')
    import ComplainModal from '../components/ComplainModal'
    import FeedbackModal from '../components/FeedbackModal'

    export default {
        components: {
            ComplainModal,
            FeedbackModal
        },
        data() {
            return {
                ORDER_STATE_DESC,
                ORDER_STATE,
                Util,
                order_id: this.$route.query.order_id,
                order: {},
                formItem: {},
                rules: {
                    sex: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
                columns1: [
                    {
                        title: '预约名称',
                        key: 'name'
                    },
                    {
                        title: '预约时间',
                        key: 'date'
                    }
                ],
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {
            init(){
                this.getAppointDetail()
            },
            pay() {
                this.http.post('order/pay', {
                    order_id:this.order.order_id,
                }).then((data) => {

                    PayUtil.pay(data.secuParam,this.init,this.init)

                }).catch(err => {
                    this.$Message.error(err)
                })
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
            feedback() {
                alert(2)
            },
            showComplainModal() {
                this.$refs.complainModal.show();
            },
            showFeedbackModal() {
                this.$refs.feedbackModal.show();
            },
            /**
             * 24小时内能取消（已支付的直接退款
             * 24小时外不能退款）
             */
            cancel() {
                this.$Modal.confirm({
                    title: '您确定取消吗？',
                    content: '',
                    onOk: () => {
                        this.http.post('order/cancelOrder', {
                            order_id:this.order.order_id
                        }).then(() => {
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




        }
    }
</script>

<style scoped>


</style>
