<template>


    <section class="" style="padding: 1em;">

        <section style="margin-bottom: 1em;">
            <span style="font-weight: bold">请选择预约日期：</span>
            <DatePicker type="date" :options="timeOptions" placeholder="请选择预约日期" style="width: 200px"></DatePicker>
        </section>

        <section style="">

            <p style="font-weight: bold;margin-bottom: 1em;">请选择预约时段：</p>

            <template v-if="availablePeriodArray.length>0">
                <CheckboxGroup v-model="periodArray" style="margin-left: 1em;" >

                    <template v-for="(period,index) in availablePeriodArray">

                        <Checkbox :label="period.key" style="margin-right: 3em;">
                            {{period.desc}}
                        </Checkbox>
                        <template v-if="index%2!==0">
                            <br/>
                            <br/>
                        </template>

                    </template>

                </CheckboxGroup>
            </template>

            <template v-else>
                <p style="color:red;font-size: 12px;margin-bottom: .5em;">所选日期无可用时段，是否仍要选择时段，选择后在咨询师此时段可用时优先通知您！</p>
                <CheckboxGroup v-model="myPeriodArray" style="margin-left: 1em;" >

                    <template v-for="(period,index) in myAvailablePeriodArray">

                        <Checkbox :label="period.key" style="margin-right: 3em;">
                            {{period.desc}}
                        </Checkbox>
                        <template v-if="index%2!==0">
                            <br/>
                            <br/>
                        </template>

                    </template>

                </CheckboxGroup>
            </template>

        </section>

        <section class="mainContent">

            <div style="margin-top: 1em;">
                <Button type="primary" long @click="next">下一步</Button>
            </div>

        </section>

    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'
    import TimePeriod from "./components/TimePeriod";

    export default {
        data() {
            return {
                periodArray: ['period1','period3'],
                myPeriodArray: ['period1','period3'],
                availablePeriodArray:[],
                myAvailablePeriodArray:[{
                    desc:'08:00-08:50',
                    key:'period1'
                },{
                    desc:'09:00-09:50',
                    key:'period2'
                },{
                    desc:'10:00-10:50',
                    key:'period3'
                },{
                    desc:'11:00-11:50',
                    key:'period4'
                },{
                    desc:'13:00-13:50',
                    key:'period5'
                },{
                    desc:'14:00-14:50',
                    key:'period6'
                },{
                    desc:'15:00-15:50',
                    key:'period7'
                },{
                    desc:'16:00-16:50',
                    key:'period8'
                },],
                appointType: 'family',
                mannerType: '1',
                roomId: '359baf4a6e1f4cc5a10ad31d1b2f5317',
                date: new Date(),
                timeOptions: {
                    //只能预约两个月内，同时咨询师可预约的时间段
                    disabledDate: (date) => {
                        return date && (this.isBeforeToday(date) || this.isAfterTwoMonths(date))
                    }
                },

            }
        },
        components: {
            TimePeriod
        },
        computed: {},
        mounted() {
        },
        methods: {

            isBeforeToday(date) {
                return date.valueOf() < (Date.now() - 86400000);
            },
            isAfterTwoMonths(date) {

                let twoMonthLater = new Date();
                twoMonthLater.setMonth(twoMonthLater.getMonth() + 2);
                return date.getTime() > twoMonthLater.getTime()
            },

            next() {

                this.$router.push('/therapistList')

            },


        }
    }
</script>

<style scoped>

    .mainContent {
        width: 98%;
        margin-left: 1%;
        margin-bottom: 5%;
    }


</style>
