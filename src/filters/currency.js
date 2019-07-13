/**
 * 格式化金额
 * @param val
 * @returns {string}
 */
const currency = (val,symbol) => {
    symbol=symbol||'';
    return symbol + Number(val).toFixed(2)
}
export { currency}