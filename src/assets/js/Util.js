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

    /**
     * 取得url后边的参数
     * @param name
     * @returns
     */
    static getUrlParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r !== null) return unescape(r[2])
        return null
    }

    static uuid () {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }
    /**
     * 数组转对象
     * @param array
     * @param key
     */
    static array2Object(array,key='id'){
        let obj={}

        array.forEach(item=>{
            obj[item[key]]=item;
        })

        return obj;
    }

    /**
     * 获取某年某月有多少天
     * @param year
     * @param month 0-11
     * @returns {number}
     */
    static getDaysOfMonth(year, month) {
        month+=1;
        let d = new Date(year, month, 0);
        return d.getDate();
    }

}
Util.pageSize=10;
export {Util}
