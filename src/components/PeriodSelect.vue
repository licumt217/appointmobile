<template>
    <section>
        <Card>
            <p slot="title">请选择预约日期</p>

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
                    <p style="text-align: center">
                            <span class="">
                                {{item}}
                            </span>
                    </p>
                </div>

            </section>

            <section>
                <div class="num" v-for="(item,index) in dataList" style="margin-bottom: .8em;">
                    <template v-if="item.num">
                        <p v-if="item.canAppoint" style="text-align: center;">
                            <span class="able_appoint btn" @click="queryPeriodsByDate(item,index)"
                                  :class="{'btn_active':item.active}">
                                {{item.num}}
                            </span>

                        </p>
                        <p v-else style="text-align: center">
                            <span class="disable_appoint">
                                {{item.num}}
                            </span>
                        </p>
                    </template>

                </div>
            </section>
        </Card>

        <Card style="margin-top: .5em;" v-if="availablePeriodArray.length>0">
            <p slot="title">
                请选择预约时段
            </p>
            <CheckboxGroup v-model="selectPeriodArray" style="margin-left: 1em;">

                <template v-for="(period,index) in availablePeriodArray">

                    <Checkbox :label="period" style="width:48%;margin-right: 1%;">
                        {{`${period}:00-${period}:50`}}
                    </Checkbox>
                    <template v-if="index%2!==0">
                        <br/>
                        <br/>
                    </template>

                </template>

            </CheckboxGroup>
            <group >
                <x-number v-model="weeks" min=1 max="10" style="line-height: 2em;color:red;" title="预约周数"></x-number>
            </group>
            <div style="margin-top: 1em;">
                <x-button class="long_btn" plain type="primary" @click.native="next">确定</x-button>
            </div>
        </Card>
    </section>
</template>

<script>
    import DateUtil from "../assets/js/DateUtil";

    export default {
        data() {
            return {
                weeks:1,
                weekArray: ['日', '一', '二', '三', '四', '五', '六'],
                dataList: [],
                selectMonth: '',
                date: {},
                nowDate: {},
                canAppointDate: {},
                allAvailablePeriodArray: [],
                availablePeriodArray: [],
                selectPeriodArray: [],
                appoint_date:{}
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
            resetSelectArray() {
                this.selectPeriodArray = []
            },
            next() {

                if(!this.selectPeriodArray || this.selectPeriodArray.length===0){
                    this.$vux.toast.text('请选择预约时段!')
                    return;
                }

                this.http.post('bigOrder/unifiedOrder', {
                    openid:sessionStorage.openid,
                    amount:0.01,
                    therapist_id:this.therapist_id,
                    appoint_date:DateUtil.format(this.appoint_date),
                    periodArray:this.selectPeriodArray,
                    weeks:this.weeks
                    // consult_type_id:this.consult_type_id,
                    // manner_type_id:this.manner_type_id,
                }).then((data) => {
                    this.$vux.toast.text('提交成功，请等待咨询师审核')
                    this.$router.push({
                        path:'/appoint/myAppoint',
                        query:{
                        }
                    })

                }).catch(err => {
                    this.$vux.toast.text(err)
                })

            },
            init() {

            },
            /**
             * 日历某天按钮的显示状态重置
             * */
            resetBtnStatus() {
                this.dataList.forEach((item, index) => {
                    item.active = false;
                    this.dataList.splice(index, 1, item);
                })
            },
            /**
             * 根据给定日期查询当日此咨询师的可预约时段。
             * */
            queryPeriodsByDate(item, index2) {

                this.appoint_date=item.date;

                this.resetBtnStatus();
                this.resetSelectArray()
                item.active = true;
                this.dataList.splice(index2, 1, item);


                this.availablePeriodArray = item.periods;

                console.log(item.periods)
            },
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
             * 计算某日具体的剩余可预约时段
             * */
            calAvailablePeriod(item, isAppointedBefore = false, occupiedPeriodArray) {
                if (isAppointedBefore) {
                    occupiedPeriodArray = Array.from(new Set(occupiedPeriodArray))

                    let tempAllArray = JSON.parse(JSON.stringify(this.allAvailablePeriodArray))

                    occupiedPeriodArray.forEach((item, index) => {
                        if (tempAllArray.includes(item)) {
                            let index = tempAllArray.findIndex(function (d) {
                                return d === item;
                            })
                            tempAllArray.splice(index, 1)
                        }
                    })

                    item.periods = tempAllArray;

                    return item
                } else {
                    item.periods = JSON.parse(JSON.stringify(this.allAvailablePeriodArray))
                    return item;
                }
            },
            /**
             * 根据给定日期获取此日期所在月份此咨询师已经有了哪些预约。
             */
            getOccupyedPeriod() {
                console.log(this.date)
                console.log(DateUtil.format(this.date))

                this.http.post('therapistperiod/listByMonth', {
                    therapist_id: this.therapist_id,
                    appoint_date: DateUtil.format(this.date)
                }).then((data) => {
                    this.availablePeriodArray=[]

                    //说明没有别占用的，所有日期都可以预约
                    if (data.length === 0) {
                        this.dataList.forEach((item, index) => {
                            if (item.date) {
                                if (DateUtil.isBefore(item.date, this.canAppointDate) && this.allAvailablePeriodArray.length > 0) {
                                    item.canAppoint = true;
                                    item = this.calAvailablePeriod(item)
                                    this.dataList.splice(index, 1, item);
                                }
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
                                        item = this.calAvailablePeriod(item)
                                        this.dataList.splice(index, 1, item);
                                    }
                                } else {

                                    if (DateUtil.isBefore(item.date, this.canAppointDate) && this.allAvailablePeriodArray.length > 0) {
                                        if (!this.isPeriodHasBeenUsed(map[item.date])) {
                                            item.canAppoint = true;
                                            item = this.calAvailablePeriod(item, true, map[item.date])
                                            this.dataList.splice(index, 1, item);
                                        }

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
    @btn-size:2.5em;
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

    .week {
        span{
            display: inline-block;
            line-height: @btn-size;
            width: @btn-size;
            height: @btn-size;
        }
    }

    .able_appoint {
        line-height: @btn-size;
        width: @btn-size;
        height: @btn-size;
        background: greenyellow;
        border-radius: 50%
    }

    .disable_appoint {
        display: inline-block;
        color: #FFF;
        line-height: @btn-size;
        width: @btn-size;
        height: @btn-size;
        background: rosybrown;
        border-radius: 50%
    }

    .btn {
        display: inline-block;
    }

    .btn_active {
        background: cadetblue;
        color: #FFF;
    }

    .vux-number-selector{
        height:28px!important;
    }
    .vux-number-input{
        height:28px!important;
    }
</style>