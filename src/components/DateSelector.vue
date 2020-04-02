<template>
    <Card>
        <section>
            <div class="switch" style="width:19%;" @click="switchMonth(0)">
                <
            </div>
            <div class="switch" style="width:60%;">
                {{selectMonth}}
            </div>
            <div class="switch" style="width:19%;" @click="switchMonth(1)">
                >
            </div>
        </section>
        <section>
            <div class="week" v-for="item in weekArray">

                <p style="line-height:3em;width:3em;height:3em;">{{item}}</p>
            </div>

        </section>
        <section style="margin: 0 auto;">
            <div class="num" v-for="item in dataList" style="margin-bottom: .8em;">
                <template v-if="item.num">
                    <p v-if="item.canAppoint"
                       style="line-height:2.5em;width:2.5em;height:2.5em;background: greenyellow;border-radius: 50%">
                        {{item.num}}
                    </p>
                    <p v-else style="color:#FFF;line-height:2.5em;width:2.5em;height:2.5em;background: rosybrown;border-radius: 50%">
                        {{item.num}}
                    </p>
                </template>


            </div>
        </section>
    </Card>
</template>

<script>
    import DateUtil from "../assets/js/DateUtil";

    export default {
        data() {
            return {
                weekArray: ['日', '一', '二', '三', '四', '五', '六'],
                dataList: [],
                selectMonth: '',
                date: {},
                nowDate: {},
                canAppointDate: {},
                allAvailablePeriodArray: []
            }
        },
        props: {
            therapist_id: String
        },
        mounted() {

            this.getPeriodSet().then(data => {
                this.getCanAppointDate().then(data => {
                    this.canAppointDate = data;


                    this.nowDate = new Date();
                    this.realSwitch(new Date(this.nowDate.getFullYear(), this.nowDate.getMonth(), this.nowDate.getDate()))
                })
            })


        },
        methods: {
            realSwitch(date) {
                this.date = date;

                this.dataList = []

                let firstDay = this.getFirstDayOfGivenDate(this.date);

                let lastDay = this.getLastDayOfGivenDate(this.date);

                let firstWeekIndex = firstDay.getDay();

                for (let i = 0; i < firstWeekIndex; i++) {
                    this.dataList.push({
                        num: ''
                    });
                }

                for (let i = 1; i <= lastDay.getDate(); i++) {
                    this.dataList.push({
                        num: i,
                        date: this.getDateByIndex(i)
                    })
                }

                this.selectMonth = `${this.date.getFullYear()}年${this.date.getMonth() + 1}月`

                this.getOccupyedPeriod();
            },
            getDateByIndex(index) {
                return new Date(this.date.getFullYear(), this.date.getMonth(), index)
            },
            switchMonth(type) {
                if (type === 1) {//下一月
                    this.date.setMonth(this.date.getMonth() + 1)
                    this.realSwitch(this.date)
                } else {

                    if (this.date.getTime() > this.nowDate.getTime()) {

                        this.date.setMonth(this.date.getMonth() - 1)

                        this.realSwitch(this.date);
                    }


                }
            },
            getFirstDayOfGivenDate(date) {
                let date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                date2.setDate(1);
                return date2;
            },
            getLastDayOfGivenDate(date) {
                let currentMonth = date.getMonth();
                let nextMonth = ++currentMonth;
                let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                let oneDay = 1000 * 60 * 60 * 24;
                return new Date(nextMonthFirstDay - oneDay);
            },
            /**
             * 获取咨询师可预约到的日期
             * TODO 需要后台添加个接口
             * */
            getCanAppointDate() {

                return new Promise(function (resolve) {
                    resolve(new Date(2020, 7, 21))
                })
            },
            getPeriodSet() {
                return new Promise(resolve => {
                    this.http.post('therapist/getUseablePeriodSet', {
                        therapist_id: this.therapist_id
                    }).then((data) => {
                        this.allAvailablePeriodArray = data.period.split(',')
                        resolve()
                    }).catch(err => {
                        this.$Message.error(err)
                    })
                })


            },
            /**
             * 根据给定日期获取此日期所在月份此咨询师已经有了哪些预约。
             */
            getOccupyedPeriod() {
                console.log(this.date)
                console.log(DateUtil.format(this.date))

                this.periodArray = []
                this.http.post('therapistperiod/listByMonth', {
                    therapist_id: this.therapist_id,
                    appoint_date: DateUtil.format(this.date)
                }).then((data) => {

                    //说明没有别占用的，所有日期都可以预约
                    if (data.length === 0) {
                        this.availablePeriodArray = this.allAvailablePeriodArray
                        this.dataList.forEach(item => {
                            if (DateUtil.isBefore(item.date, this.canAppointDate) && this.allAvailablePeriodArray.length > 0) {
                                item.canAppoint = true;
                            }

                        })
                    } else {

                        let map = {}
                        data.forEach(item => {
                            if (map[new Date(item.appoint_date)]) {
                                map[new Date(item.appoint_date)].push(item.period)
                            } else {
                                map[new Date(item.appoint_date)] = [item.period]
                            }
                        })

                        console.log('map', map)

                        this.dataList.forEach((item, index) => {
                            if (item.date) {
                                if (!map[item.date]) {
                                    if (DateUtil.isBefore(item.date, this.canAppointDate) && this.allAvailablePeriodArray.length > 0) {
                                        item.canAppoint = true;
                                        this.dataList.splice(index, 1, item);
                                    }
                                } else {

                                    if (DateUtil.isBefore(item.date, this.canAppointDate) && this.allAvailablePeriodArray.length > 0 && !this.isPeriodHasBeenUsed(map[item.date])) {
                                        this.dataList.splice(index, 1, item);
                                    }
                                }
                            }


                        })

                        console.log(this.dataList)


                    }


                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            isPeriodHasBeenUsed(curPeriodArray) {

                curPeriodArray = Array.from(new Set(curPeriodArray))
                return curPeriodArray.length >= this.allAvailablePeriodArray.length;
            }
        }
    }
</script>

<style lang="less">
    .week, .num {
        display: inline-block;
        width: 14.2%;
        margin-left: 0px;
        color: gray;
        text-align: center;
        line-height: 3em;
    }

    .switch {
        display: inline-block;
        width: 49%;
        margin-left: -1px;
        color: gray;
        text-align: center;
        line-height: 3em;
    }

    .num {
        color: black;
    }
</style>