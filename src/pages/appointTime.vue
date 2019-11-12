<template>


    <section class="" style="padding: 1em;">

        <section style="margin-bottom: 2em;">
            <span style="font-weight: bold">请选择预约日期：</span>
            <DatePicker v-model="appoint_date" type="date" :options="timeOptions" placeholder="请选择预约日期" style="width: 200px"></DatePicker>
        </section>

        <section style="" v-if="appoint_date && availablePeriodArray">

            <p style="font-weight: bold;margin-bottom: 1em;">请选择预约时段：</p>

            <template v-if="availablePeriodArray.length>0">
                <CheckboxGroup v-model="periodArray" style="margin-left: 1em;" >

                    <template v-for="(period,index) in availablePeriodArray">

                        <Checkbox :label="period" style="margin-right: 3em;">
                            {{descMap[period]}}
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

                        <Checkbox :label="period" style="margin-right: 3em;">
                            {{descMap[period]}}
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
    import DateUtil from '../assets/js/DateUtil'
    import TimePeriod from "./components/TimePeriod";

    export default {
        data() {
            return {
                therapist_id:this.$route.query.therapist_id,
                consult_type_id:this.$route.query.consult_type_id,
                manner_type_id:this.$route.query.manner_type_id,
                appoint_date:null,
                periodArray: [],
                myPeriodArray: ['period1','period3'],
                availablePeriodArray:null,
                myAvailablePeriodArray:[
                    'period1',
                    'period2',
                    'period3',
                    'period4',
                    'period5',
                    'period6',
                    'period7',
                    'period8',
                ],
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
                descMap:{
                    period1:'08:00-08:50',
                    period2:'09:00-09:50',
                    period3:'10:00-10:50',
                    period4:'11:00-11:50',
                    period5:'13:00-13:50',
                    period6:'14:00-14:50',
                    period7:'15:00-15:50',
                    period8:'16:00-16:50',
                }

            }
        },
        components: {
            TimePeriod
        },
        watch:{
            appoint_date(newValue,oldValue){
                this.getAvailablePeriod()
            }
        },
        computed: {},
        mounted() {
        },
        methods: {


            /**
             * 获取咨询师在某天的可预约时段
             */
            getAvailablePeriod(){
                if(!this.appoint_date){
                    return;
                }

                this.periodArray=[]
                this.http.post('therapistperiod/list', {
                    therapist_id:this.therapist_id,
                    appoint_date:DateUtil.format(this.appoint_date)
                }).then((data) => {

                    if(data.length===0){
                        this.availablePeriodArray=JSON.parse(JSON.stringify(this.myAvailablePeriodArray))
                    }else{
                        let notAvailableArray=[]
                        data.forEach(item=>{
                            for(let i=1;i<=8;i++){
                                let key=`period${i}`
                                let data=item[key]
                                if(data===1){
                                    notAvailableArray.push(key)
                                }
                            }
                        })
                        let fullArray=JSON.parse(JSON.stringify(this.myAvailablePeriodArray))

                        this.availablePeriodArray=fullArray.filter((item)=>{
                            return !notAvailableArray.includes(item)
                        })




                    }

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            isBeforeToday(date) {
                return date.valueOf() < (Date.now() - 86400000);
            },
            isAfterTwoMonths(date) {

                let twoMonthLater = new Date();
                twoMonthLater.setMonth(twoMonthLater.getMonth() + 2);
                return date.getTime() > twoMonthLater.getTime()
            },

            next() {

                if(!this.appoint_date){
                    this.$Message.warning("请选择预约日期！")
                    return;
                }

                if(!this.periodArray || this.periodArray.length===0){
                    this.$Message.warning("请选择预约时段！")
                    return;
                }

                this.http.post('order/unifiedOrder', {
                    openid:sessionStorage.openid,
                    amount:0.01,
                    therapist_id:this.therapist_id,
                    appoint_date:DateUtil.format(this.appoint_date),
                    periodArray:this.periodArray,
                    consult_type_id:this.consult_type_id,
                    manner_type_id:this.manner_type_id,
                }).then((data) => {
                    this.$Message.success("预约成功！")
                    this.$router.push({
                        path:'/myAppoint',
                        query:{
                        }
                    })

                }).catch(err => {
                    this.$Message.error(err)
                })

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
