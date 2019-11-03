<template>

    <div class="login-wrap">
        <Button type="success" long @click="unifiedOrder">下单</Button>

        <ul>
            <li v-for="order in orders" >
                <div style="border:1px solid green">
                    订单号：{{order.trade_no}}<br/>
                    <div v-if="order.state===1">
                        state:{{order.state}}
                        <Button type="error" long @click="cancel(order)">取消订单</Button>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>

    import {Util} from '../assets/js/Util'
    import {PayUtil} from '../assets/js/PayUtil'

    export default {
        data() {
            return {
                orders:[]
            }
        },
        components:{
        },
        computed: {
        },
        mounted() {
            this.getOrderList()
        },
        methods: {
            cancel(order){
                this.http.post('order/cancelOrder', {
                    trade_no:order.trade_no,
                }).then((data) => {

                    this.getOrderList()

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getOrderList(){
                this.http.post('order/getOrderList', {
                    openid:sessionStorage.openid,
                }).then((data) => {

                    this.orders=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            unifiedOrder(){

                this.http.post('order/unifiedOrder', {
                    openid:sessionStorage.openid,
                    therapist_id:Util.uuid(),
                    amount:0.01,
                }).then((data) => {

                        PayUtil.pay(data.secuParam,this.successCallback,this.failCallback)

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            successCallback(){
                this.$Message.success("支付成功！")
            },

            failCallback(){
                this.$Message.error("支付失败！")
            }
        }
    }
</script>

<style scoped>



</style>
