<template>


    <section class="">
        <div class="mainContent">
            <template v-if="therapistList.length>0">
                <Card v-for="item in therapistList" style="margin-bottom: 0.5em;">
                    <p slot="title">
                        {{item.name}}
                    </p>
                    <p>性别：{{SEX[item.gender]}}</p>
                    <p>流派：{{schoolTypeObj[item.school_type_id].school_type_name}}</p>
                    <p>资历：{{qualificationTypeObj[item.qualification_type_id].qualification_type_name}}</p>
                    <Row style="margin-top: .5em;" justify="space-between" type="flex">
                        <Col span="8" >
                            <Button type="primary" size="small" @click="next(item)">
                                选择此咨询师
                            </Button>
                        </Col>
                        <Col span="8" >
                            <Button type="primary" ghost size="small" @click="detail(item)">
                                查看详情
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </template>
            <template v-else>
                <Card >
                    <p slot="title">
                        无结果
                    </p>
                    <p>未找到符合条件的咨询师</p>
                </Card>
            </template>




        </div>
        <EmergencyConsultModal ref="emergencyConsult" @consult="consult"></EmergencyConsultModal>





    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    import Role from '../../assets/js/Role'
    import {SEX} from "../../assets/js/constants/constant"
    import EmergencyConsultModal from '../components/EmergencyConsultModal'
    export default {
        components:{
            EmergencyConsultModal
        },
        data() {
            return {
                qualificationTypeObj:{},
                schoolTypeObj:{},
                isEmergency:this.$route.query.isEmergency?true:false,
                SEX,
                therapistList: [],
                consult_type_id:this.$route.query.consult_type_id,
                manner_type_id:this.$route.query.manner_type_id,


            }
        },
        computed: {},
        mounted() {
            this.init();
        },
        methods: {
            init(){
                Promise.all([
                    this.http.post('qualificationtype/list', {}),
                    this.http.post('schooltype/list', {})
                ]).then((data) => {
                    this.qualificationTypeObj=Util.array2Object(data[0],'qualification_type_id')
                    this.schoolTypeObj=Util.array2Object(data[1],'school_type_id')
                    this.getList();
                }).catch(error => {
                    this.$Message.error(error)
                });
            },
            //紧急咨询回调
            consult(){
                //TODO 后续流程呢？
            },

            getList(page) {



                page=page||1;

                let pageSize=Util.pageSize

                let whereObj={
                    role:Role.therapist,
                    page,
                    pageSize,
                    manner_type_id:this.manner_type_id
                }

                if(this.isEmergency){
                    whereObj.isEmergency=1
                }

                this.http.post('user/list', whereObj).then((data) => {

                    this.therapistList = data.data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            detail(item) {

                this.$router.push({
                    path:'/therapist/detail',
                    query:{
                        therapist_id:item.therapist_id
                    }
                })

            },
            next(item) {

                //TODO 紧急咨询时填原因

                //TODO 判断是否平台黑名单或所选咨询师的黑名单，是的话无法继续预约。分两次判断，当前所选咨询师黑名单的话可以切换咨询师

                //TODO 判断是否首次预约，首次的话需要同意隐私条款。隐私条款每条都需要同意吗？类似复选框都选中？还是确定一条之后依次出现下一条。这样是否太变态了？

                if(this.isEmergency){

                    this.$refs.emergencyConsult.show()

                }else{
                    alert(this.consult_type_id)
                    this.$router.push({
                        path:'/steps/step3',
                        query:{
                            therapist_id:item.therapist_id,
                            consult_type_id:this.consult_type_id,
                            manner_type_id:this.manner_type_id
                        }
                    })
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
