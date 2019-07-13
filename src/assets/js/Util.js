class Util{


    /**
     * 判断给定字符是否是中文
     * @param temp
     * @returns {Boolean}
     */
    static isChinese (s) {
        var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
        var flag = true
        if (!patrn.exec(s)) {
            flag = false
        }
        return flag
    }

    /**
     * 验证给定字符是否是A-Za-z之间的英文字母
     */
    static isEnglish (value) {
        var str = /^[A-Za-z]*$/
        var flag = false
        if (str.test(value)) {
            flag = true
        }
        return flag
    }


    /**
     * 是否全是数字
     * @param p
     * @returns
     */
    static isAllNum (p) {
        var re = /^\d*$/
        return re.test(p)
    }
    /**
     * 验证手机号
     */
    static isValidPhone (p) {
        var re = /^1\d{10}$/
        return re.test(p)
    }
    /**
     * 验证身份证号
     */
    static isValidID (p) {
        p = String(p).toUpperCase()
        var re = /(^\d{15}$)|(^\d{17}([0-9]|X$))/
        return re.test(p)
    }
    /**
     * 验证邮箱地址合法性
     * @param temp
     * @returns {Boolean}
     */
    static isValidEmail (s){
        var re=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return re.test(s);
    }
}

export {Util}
