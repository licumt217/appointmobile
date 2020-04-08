<template>


    <div class="">

        <Card>
            <p slot="title">预约详情</p>
            <p>预约日期：{{order.appoint_date}}</p>
            <p>预约时段：{{Util.getAppointPeriodStrFromArray(order)}}</p>
            <p>咨询师：{{order.therapist_name}}</p>
            <p>用户：{{order.user_name}}</p>
            <p>订单状态：{{ORDER_STATE_DESC[order.state]}}</p>
            <!--            可能需要用户的一些基本信息-->

        </Card>

<!--        普通用户-->
<!--        咨询前单次支付的可以支付-->
        <template v-if="user_type==='user'">
            <section v-if="order.fee_type===0" style="margin-top: .5em;">
                <div v-if="order.state===ORDER_STATE.AUDITED">
                    <x-button plain type="primary" @click.native="pay">立即支付</x-button>
                </div>
            </section>
        </template>

<!--        咨询师-->
        <template v-else>
            <section style="margin-top: .5em;">
                <div v-if="order.state===ORDER_STATE.COMMIT">
                    <x-button plain type="primary" @click.native="accept">接受咨询</x-button>
                    <x-button plain type="warn" @click.native="deny">拒绝咨询</x-button>
                </div>

                <!--        //咨询过了结束日期后才能有以下的确认完成操作-->
                <div v-if="order.state===ORDER_STATE.DONE">
                    <x-button plain type="primary" @click.native="done">确认完成</x-button>
                    <x-button plain type="warn" @click.native="showComplainModal">投诉用户</x-button>

                </div>

            </section>
        </template>





        <ComplainModal ref="complainModal" :order_id="order.order_id"></ComplainModal>
        <AcceptAppointmentModal @callback="init" ref="acceptAppointmentModal"></AcceptAppointmentModal>

    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'

    const ORDER_STATE_DESC = require('../../assets/js/constants/ORDER_STATE_DESC')
    const ORDER_STATE = require('../../assets/js/constants/ORDER_STATE')
    import ComplainModal from '../components/ComplainModal'
    import {PayUtil} from "../../assets/js/PayUtil";
    import AcceptAppointmentModal from "../components/AcceptAppointmentModal";
    export default {
        components: {
            ComplainModal,
            AcceptAppointmentModal
        },
        data() {
            return {
                ORDER_STATE_DESC,
                ORDER_STATE,
                Util,
                appointment_id: this.$route.query.appointment_id,
                order: {},
                user_type:''
            }
        },

        computed: {},
        mounted() {
            // this.user_type='user'
            this.init()
        },
        methods: {
            init() {
                this.getAppointmentDetail()
            },
            showComplainModal() {
                this.$refs.complainModal.show('therapist');
            },

            getAppointmentDetail() {
                this.http.post('appointment/getDetail', {
                    appointment_id: this.appointment_id
                }).then((data) => {
                    if(data){
                        this.order = data;
                    }else{
                        this.$vux.toast.text('预约不存在')
                    }


                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },

            getAppointDetail() {
                this.http.post('order/getAppointDetail', {
                    order_id: this.order_id
                }).then((data) => {
                    if(data){
                        this.order = data;
                    }else{
                        this.$vux.toast.text('订单不存在')
                    }


                }).catch(err => {
                    this.$vux.toast.text(err)
                })
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
            accept(){

                this.$refs.acceptAppointmentModal.show(this.order);
            },
            deny(){
                console.log(1)
                this.$vux.confirm.show({
                    content:'您确定拒绝吗？',
                    onCancel () {
                    },
                    onConfirm :()=>{
                        this.http.post('appointment/deny', {
                            appointment_id: this.appointment_id
                        }).then((data) => {
                            this.$vux.toast.text("操作成功")
                            this.init()

                        }).catch(err => {
                            this.$vux.toast.text(err)
                        })
                    }
                })



            },
            done(){
                this.http.post('order/done', {
                    order_id: this.order_id
                }).then((data) => {
                    this.$vux.toast.text("操作成功")
                    this.init()

                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },


        }
    }
</script>

<style scoped>


</style>
