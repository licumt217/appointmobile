<template>


    <section class="" style="width:98%;margin: 0 auto;padding-top: .5em;">

        <PeriodSelect :therapist_id="therapist_id"></PeriodSelect>



    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    import DateUtil from '../../assets/js/DateUtil'
    import TimePeriod from "../components/TimePeriod";
    import PeriodSelect from "../../components/PeriodSelect";

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
                allAvailablePeriodArray:[],//咨询师设置的可用时段

            }
        },
        components: {
            TimePeriod,
            PeriodSelect
        },
        watch:{
            appoint_date(newValue,oldValue){
                this.getPeriodSet()
            }
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
                        path:'/appoint/myAppoint',
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
