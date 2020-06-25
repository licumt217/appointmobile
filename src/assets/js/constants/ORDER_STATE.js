/**
 * 订单状态
 * 最终状态：已退款、已过期、已完结、已取消
 * @type {{PAYED: number, UNFUNDED: number, DONE: number, COMMIT: number, EXPIRED: number}}
 */
let ORDER_STATE = {
    COMMIT: 0,      //已下单
    PAYED: 1,       //已支付
    UNFUNDED: 2,    //已退款
    EXPIRED: 3,     //已过期
    CANCELED: 4,     //已取消
    DONE: 5,     //已完结
    REFUNDING: 6,     //退款中
    PAYING: 7,     //支付中 //TODO 后期好好完善下，支付中的状态需要还原为具体不同的状态，比如成功、比如已取消 支付（还原为已下单？）
};



export default ORDER_STATE
