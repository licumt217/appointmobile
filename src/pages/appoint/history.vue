<template>


    <section class="">
        <div class="mainContent">
            <Table border stripe :columns="appointListColumns" :data="appointList">
                <template slot-scope="{ row }" slot="appoint_date">
                    <span @click="go2Detail(row)" style="color:blue;">{{ row.appoint_date }}</span>
                </template>
            </Table>




        </div>



    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                Util,
                appointListColumns: [
                    {
                        title: '预约日期',
                        slot: 'appoint_date',
                    },
                    {
                        title: '咨询师名称',
                        key: 'name'
                    },
                ],
                appointList: [
                ],
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {


            getAppointList(){
                this.http.post('order/getAppointHistory', {
                    openid:sessionStorage.openid,
                }).then((data) => {
                    this.appointList=data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            init(){
                this.getAppointList()
            },
            go2Detail(order) {
                this.$router.push({
                    path:'/appoint/detail',
                    query:{
                        order_id:order.order_id
                    }
                })
            },
            back() {
                this.$router.go(-1)
            },
            operate() {

                this.$router.push('/user/myAppoint')

            },


        }
    }
</script>

<style scoped>

    .mainContent {
        width: 97%;
        margin:0 auto;
    }






</style>
