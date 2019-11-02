<template>

    <div class="login-wrap">
        <Button type="success" long @click="pay">支付</Button>
    </div>

</template>

<script>

    import {Util} from '../assets/js/Util'
    import {PayUtil} from '../assets/js/PayUtil'

    export default {
        data() {
            return {

            }
        },
        components:{
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            pay(){
                this.http.post('unifiedOrder', {
                    openid:sessionStorage.openid,
                    therapist_id:Util.uuid(),
                    amount:0.01,
                }).then((data) => {

                        PayUtil.pay(data,this.successCallback,this.failCallback)

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
