/**
 * 订单状态
 * @type {{UN_PAY: number, PAYED: number, UNFUNDED: number, CANCELED: number, EXPIRED: number}}
 */
let ORDER_STATE_DESC = {
    0: '已下单',      //
    1: '已审核',       //
    2: '已拒绝',    //
    3: '已支付',    //
    4: '已退款',     //
    5: '已取消',     //
    6: '已过期',     //
    7: '已完结',     //


};



module.exports = ORDER_STATE_DESC
