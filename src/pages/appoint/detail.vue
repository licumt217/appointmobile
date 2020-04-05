<template>


    <div >
        <Card>

            <p slot="title">预约详情</p>
            <p>预约日期：{{order.appoint_date}}</p>
            <p>预约时段：{{Util.getAppointPeriodStrFromArray(order)}}</p>
            <p>咨询师：{{order.name}}</p>
            <p>订单状态：{{ORDER_STATE_DESC[order.state]}}</p>

        </Card>
        <div style="margin:1em auto 0 auto;">
            <flexbox >
                <template v-if="order.state===ORDER_STATE.AUDITED">
                    <flexbox-item>
                        <x-button class="long_btn" plain type="primary" @click.native="pay">立即支付</x-button>
                    </flexbox-item>

                </template>

                <template v-if="order.state===ORDER_STATE.COMMIT || order.state===ORDER_STATE.AUDITED || order.state===ORDER_STATE.PAYED">
                    <flexbox-item>
                        <x-button class="long_btn" plain type="warn" @click.native="cancel">取消预约</x-button>
                    </flexbox-item>

                </template>

                <template v-if="order.state===ORDER_STATE.DONE">
                    <flexbox-item>
                        <x-button class="long_btn" plain type="warn" @click.native="showFeedbackModal">咨询效果反馈</x-button>
                    </flexbox-item>
                    <flexbox-item>
                        <x-button class="long_btn" plain type="warn" @click.native="showComplainModal">投诉咨询师</x-button>
                    </flexbox-item>
                </template>


            </flexbox>

        </div>

        <ComplainModal ref="complainModal" :order_id="order_id"></ComplainModal>
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
                    this.$vux.toast.text(err)
                })
            },
            getAppointDetail() {

                this.http.post('order/getAppointDetail', {
                    order_id: this.order_id
                }).then((data) => {
                    this.order = data;

                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },
            feedback() {
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
                this.$vux.confirm.show({
                    content:'您确定取消吗',
                    onCancel () {
                    },
                    onConfirm :()=>{
                        this.http.post('order/cancelOrder', {
                            order_id:this.order.order_id
                        }).then(() => {
                            this.$vux.toast.text('操作成功')
                            this.init()

                        }).catch(err => {
                            this.$vux.toast.text(err)
                        })
                    }
                })

            },




        }
    }
</script>

<style scoped>


</style>
