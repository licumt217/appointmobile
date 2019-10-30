<template>

    <div class="login-wrap">
        <button type="success" long @click="pay">支付</button>
    </div>

</template>

<script>
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
                    out_trade_no:String(Math.random()).split(".")[1],
                    total_fee:0.01,
                }).then((obj) => {



                    alert(JSON.stringify(obj))


                    setTimeout(()=>{
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', obj,
                            function(res){
                                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                    alert("支付成功")
                                    // 使用以上方式判断前端返回,微信团队郑重提示：
                                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                }else{
                                    alert("支付失败")
                                }
                            });
                    },5000)




                }).catch(err => {
                    this.$Message.error(err)
                })
            }
        }
    }
</script>

<style scoped>



</style>
