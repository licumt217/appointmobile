<template>


    <section class="">
        <div class="mainContent">
            <Card v-for="person in therapistList" style="margin-bottom: 0.5em;">
                <p slot="title">
                    {{person.name}}
                </p>
                <p>性别：{{SEX[person.sex]}}</p>
                <p>流派：{{SCHOOL_TYPE[person.school_type]}}</p>
                <p>资历：{{QUALIFICATION_TYPE[person.qualification_type]}}</p>
                <Row style="margin-top: .5em;" justify="space-between" type="flex">
                    <Col span="8" >
                        <Button type="primary" size="small" @click="next">
                            选择此咨询师
                        </Button>
                    </Col>
                    <Col span="8" >
                        <Button type="primary" ghost size="small" @click="detail">
                            查看详情
                        </Button>
                    </Col>
                </Row>

            </Card>


        </div>
        <EmergencyConsultModal ref="emergencyConsult" @consult="consult"></EmergencyConsultModal>





    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'
    import {SCHOOL_TYPE,QUALIFICATION_TYPE,SEX} from "../assets/js/constants/constant"
    import EmergencyConsultModal from './components/EmergencyConsultModal'
    export default {
        components:{
            EmergencyConsultModal
        },
        data() {
            return {
                isEmergency:this.$route.query.isEmergency?true:false,
                SCHOOL_TYPE,
                QUALIFICATION_TYPE,
                SEX,
                appointType: 'family',
                mannerType: '1',
                therapistList: [],


            }
        },
        computed: {},
        mounted() {
            this.getTherapistList();
        },
        methods: {
            //紧急咨询回调
            consult(){
                //TODO 后续流程呢？
            },

            getTherapistList(){
                //TODO 根据是否紧急咨询返回对应列表，有些咨询师不允许紧急咨询的
                if(this.isEmergency){
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
                        }

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

            detail() {

                this.$router.push('/therapistDetail')

            },
            next() {

                //TODO 紧急咨询时填原因

                //TODO 判断是否平台黑名单或所选咨询师的黑名单，是的话无法继续预约。分两次判断，当前所选咨询师黑名单的话可以切换咨询师

                //TODO 判断是否首次预约，首次的话需要同意隐私条款。隐私条款每条都需要同意吗？类似复选框都选中？还是确定一条之后依次出现下一条。这样是否太变态了？

                if(this.isEmergency){

                    this.$refs.emergencyConsult.show()

                }else{
                    this.$router.push('/appointTime')
                }

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
