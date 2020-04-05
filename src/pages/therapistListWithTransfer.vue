<template>


    <section class="">
        <div >
            <div class="ms-login">

                <Tabs :value="cityList[0]" v-if="cityList.length>0" @on-click="changeTab">

                    <TabPane :label="city" :name="city" v-for="city in cityList">

                        <Card v-for="person in therapistList" style="margin-bottom: 0.5em;">
                            <p slot="title">
                                {{person.name}}
                            </p>
                            <p>性别：{{SEX[person.sex]}}</p>
                            <p>流派：{{SCHOOL_TYPE[person.school_type]}}</p>
                            <p>资历：{{QUALIFICATION_TYPE[person.qualification_type]}}</p>
                            <Row style="margin-top: .5em;" justify="space-between" type="flex">
                                <Col span="8" >
                                    <Button type="primary" size="small" @click="showTransferModal">
                                        发送转介邀请
                                    </Button>
                                </Col>
                                <Col span="8" >
                                    <Button type="primary" ghost size="small" @click="detail">
                                        查看详情
                                    </Button>
                                </Col>
                            </Row>

                        </Card>


                    </TabPane>

                </Tabs>
                <div v-else>
                    <p>暂无数据</p>
                </div>

            </div>

        </div>
    <SendTransfer ref="sendTransfer" @transfer="transfer"></SendTransfer>
    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'
    import {SCHOOL_TYPE,QUALIFICATION_TYPE,SEX} from "../assets/js/constants/constant"
    import SendTransfer from "./components/SendTransfer"
    export default {
        components:{
            SendTransfer
        },
        data() {
            return {
                cityList:[],
                SCHOOL_TYPE,
                QUALIFICATION_TYPE,
                SEX,
                therapistList:[],

            }
        },
        computed: {},
        mounted() {
            this.getTherapistListByCity('北京')
            this.getCityList()
        },
        methods: {
            transfer(){

            },
            changeTab(city){
                this.getTherapistListByCity(city)
            },
            getCityList(){
              //TODO 接口获取城市列表
                this.cityList=['北京','上海','天津','重庆']
            },
            detail() {

                this.$router.push('/therapistDetail')

            },
            showTransferModal(){
                this.$refs.sendTransfer.show()
            },
            getTherapistListByCity(city){

                if(city==='北京'){
                    this.therapistList=[
                        {
                            name: '张老师',
                            sex: 'male',
                            qualification_type: '1',
                            school_type: '1'
                        },

                    ]
                }else if(city==='上海'){
                    this.therapistList=[
                        {
                            name: '张老师',
                            sex: 'male',
                            qualification_type: '1',
                            school_type: '1'
                        },{
                            name: '李老师',
                            sex: 'male',
                            qualification_type: '2',
                            school_type: '1'
                        },

                    ]
                }else{
                    this.therapistList=[
                        {
                            name: '张老师',
                            sex: 'male',
                            qualification_type: '1',
                            school_type: '1'
                        },{
                            name: '李老师',
                            sex: 'male',
                            qualification_type: '2',
                            school_type: '1'
                        },{
                            name: '王老师',
                            sex: 'female',
                            qualification_type: '1',
                            school_type: '2'
                        },

                    ]
                }


            },

            back() {
                this.$router.go(-1)
            },



        }
    }
</script>

<style scoped>



</style>
