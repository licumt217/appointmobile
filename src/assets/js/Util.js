import {Modal, Toast} from 'antd-mobile';


class Util {

    constructor() {

    }

    static info(str, duration) {
        Toast.info(str, duration || 1.5);
    }

    static success(str, duration) {
        Toast.success(str, duration || 1.5);
    }

    static fail(str, duration) {
        if(typeof str==='object'){
            str=str.errorMSG
        }
        Toast.fail(str, duration || 1.5);
    }


    /**
     * 判断给定字符是否是中文
     * @param temp
     * @returns {Boolean}
     */
    static isChinese(s) {
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
    static isEnglish(value) {
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
    static isAllNum(p) {
        var re = /^\d*$/
        return re.test(p)
    }

    /**
     * 验证手机号
     */
    static isValidPhone(p) {
        var re = /^1\d{10}$/
        return re.test(p)
    }

    /**
     * 验证身份证号
     */
    static isValidID(p) {
        p = String(p).toUpperCase()
        var re = /(^\d{15}$)|(^\d{17}([0-9]|X$))/
        return re.test(p)
    }

    /**
     * 验证邮箱地址合法性
     * @param temp
     * @returns {Boolean}
     */
    static isValidEmail(s) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
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

    static uuid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
    static array2Object(array, key = 'id') {
        let obj = {}

        array.forEach(item => {
            obj[item[key]] = item;
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
        month += 1;
        let d = new Date(year, month, 0);
        return d.getDate();
    }

    static fixZero(val) {
        if (val < 10) {
            return '0' + val;
        } else {
            return val;
        }
    }

    static getAppointmentPeriodStrFromArray(period) {

        let str = '';
        if(!period){
            return str;
        }
        let array=period.split(',')
        array.sort((a,b)=>{
            return Number(a)-Number(b)
        });
        array.forEach((item,index) => {
            if(index===array.length-1){
                str += (`${Util.fixZero(item)}:00-${Util.fixZero(item)}:50`)
            }else{
                str += (`${Util.fixZero(item)}:00-${Util.fixZero(item)}:50，`)
            }

        })


        return str;
    }

    /**
     * 将下拉选择后台数据转为下拉列表需要的数组格式
     * @param dataArray
     * @param valueKey
     * @param nameKey
     * @returns {[]}
     */
    static getPopupPickerOptions(dataArray, valueKey, nameKey) {
        let array = [];
        dataArray.forEach(item => {
            array.push({
                value: item[valueKey],
                label: item[nameKey],
            })
        })
        return array;
    }

    static confirm(obj) {

        Modal.alert(obj.title || '', obj.msg, [
            {
                text: '取消', onPress: () => {
                    obj.onCancel && obj.onCancel()
                }
            },
            {
                text: '确定', onPress: () => {
                    obj.onConfirm && obj.onConfirm()
                }
            },
        ])
    }

    static notice(obj) {

        Modal.alert(obj.title || '', obj.msg, [
            {
                text: '确定', onPress: () => {
                    obj.onConfirm && obj.onConfirm()
                }
            },
        ])
    }

    static back(){
        window.history.back();
    }

}

Util.genderOptions = [
    {
        label: '男',
        value: 'male',
    },
    {
        label: '女',
        value: 'female',
    },
];


Util.payMannerOptions = {
    //单次预约
    single:[
        {
            label: '预约前单次支付',
            value: 'before_single',
        },
        {
            label: '预约后单次支付',
            value: 'after_single',
        },
    ],
    //持续预约
    multi:[
        {
            label: '预约前单次支付',
            value: 'before_single',
        },
        {
            label: '预约后单次支付',
            value: 'after_single',
        },{
            label: '预约后按月支付',
            value: 'after_month',
        },
    ]
};

Util.suffixArrayOfMusic = ["mp3", "wave"]

Util.suffixArrayOfPicture = ["jpg", "jpeg", "png"]

Util.backendUrl = window.location.href.indexOf("localhost") > -1 ? 'http://127.0.0.1:8350' : 'http://' + window.location.hostname+'/appoint_wx'



Util.pageSize = 10;
export default Util
