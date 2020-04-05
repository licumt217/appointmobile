<template>


    <section class="">
        <div >

            <template v-if="appointList.length>0">
                <Divider>预约记录</Divider>
                <Card v-for="item in appointList" style="margin-bottom: 0.5em;">

                    <p>咨询师：{{item.name}}</p>
                    <p>预约日期：{{item.therapist_period.appoint_date}}</p>
                    <p>预约时段：{{Util.getAppointPeriodStrFromArray(item.therapist_period)}}</p>
                    <p>预约状态：{{ORDER_STATE_DESC[item.state]}}</p>
                    <div style="margin-top: .8em;">
                        <x-button plain mini type="primary" @click.native="go2Detail(item)">查看详情</x-button>
                    </div>

                </Card>
                <p v-if="data.totalPages>data.currentPage" style="text-align: center;color:gray">
                    <span @click="loadMore">加载更多</span>
                </p>
            </template>

            <template v-else>
                <p style="text-align: center;margin-top: 2em;">暂无数据</p>
            </template>


        </div>



    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    const ORDER_STATE_DESC = require('../../assets/js/constants/ORDER_STATE_DESC')
    export default {
        data() {
            return {
                ORDER_STATE_DESC,
                Util,
                appointList: [
                ],
                data:{}
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {


            getAppointList(page,isLoadMore=false){
                this.http.post('order/getAppointHistory', {
                    openid:sessionStorage.openid,
                    pageSize:Util.pageSize,
                    page
                }).then((data) => {

                    this.data=data;
                    if(isLoadMore){
                        this.appointList=this.appointList.concat(data.data)
                    }else{
                        this.appointList=data.data;
                    }


                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            init(){
                this.getAppointList(1)
            },
            go2Detail(order) {
                this.$router.push({
                    path:'/appoint/detail',
                    query:{
                        order_id:order.order_id
                    }
                })
            },
            loadMore(){
                this.getAppointList(this.data.currentPage+1,true)
            },


        }
    }
</script>

<style scoped>






</style>
