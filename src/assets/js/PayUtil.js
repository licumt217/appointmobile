class PayUtil {


    /**
     * 微信支付
     * @param secuParam
     * @param successCallback
     * @param failCallback
     * @returns {boolean}
     */
    static pay(secuParam, successCallback, failCallback) {

        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', secuParam,
            function (res) {
                if (res.err_msg === "get_brand_wcpay_request:ok") {
                    successCallback()
                } else {
                    failCallback()
                }
            })
    }


}

export {PayUtil}
