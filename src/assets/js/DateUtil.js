let DateUtil = {
    // format(dateStr,formatStr){
    //     let date=Date.parse(dateStr);
    //
    //
    //
    //     return null;
    // },

    /**
     * 格式化日期
     * @param date
     * @param type
     */
    format(date, type = 'date') {

        let year = date.getFullYear();

        let month = date.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        let day = date.getDate()


        if (type === 'time') {

        } else if (type === 'datetime') {

        } else {
            return year + '-' + month + '-' + day;
        }
    },

    /**
     * 第一个日期参数是否早于第二个日期(毫秒数)
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    isBefore(date1, date2) {
        return date1.getTime() < date2.getTime()
    }


}

export default DateUtil;
