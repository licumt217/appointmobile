<template>


    <section class="">
        <div>
            <section>
                <group>
                    <x-address title="请选择咨询师所在区域" v-model="address" :hide-district="true"
                               :list="addressData"></x-address>
                </group>
                <flexbox style="margin-bottom: -1.2em;">
                    <flexbox-item>
                        <my-popup-picker :data="genderOptions" v-model="formItem.gender">性别</my-popup-picker>
                    </flexbox-item>
                    <flexbox-item>
                        <my-popup-picker :data="qualificationOptions" v-model="formItem.qualification_type_id">资质</my-popup-picker>
                    </flexbox-item>
                </flexbox>
                <flexbox>
                    <flexbox-item>
                        <my-popup-picker :data="schoolTypeOptions" v-model="formItem.school_type_id">学派</my-popup-picker>
                    </flexbox-item>
                    <flexbox-item>
                        <my-popup-picker :data="mannerTypeOptions" v-model="formItem.manner_type_id">咨询方式</my-popup-picker>
                    </flexbox-item>
                </flexbox>
                <x-button class="long_btn" plain text="查询" type="primary" @click.native="getList"></x-button>
            </section>

            <section style="margin-top: 1em;">
                <template v-if="therapistList.length>0">
                    <Card v-for="item in therapistList" style="margin-bottom: 0.5em;">
                        <p slot="title">
                            {{item.name}}
                        </p>
                        <p>性别：{{SEX[item.gender]}}</p>
                        <p>流派：{{schoolTypeObj[item.school_type_id]?schoolTypeObj[item.school_type_id].school_type_name:''}}</p>
                        <p>资历：{{qualificationTypeObj[item.qualification_type_id]?qualificationTypeObj[item.qualification_type_id].qualification_type_name:''}}</p>
                        <p>咨询方式：{{mannerTypeObj[item.manner_type_id]?mannerTypeObj[item.manner_type_id].manner_type_name:''}}</p>
                        <Row style="margin-top: .5em;" justify="space-between" type="flex">
                            <Col span="10">
                                <x-button class="long_btn" plain type="primary" @click.native="next(item)">选择此咨询师</x-button>
                            </Col>
                            <Col span="10">
                                <x-button class="long_btn" plain  @click.native="detail(item)">查看详情</x-button>
                            </Col>
                        </Row>

                    </Card>
                    <p v-if="listData.totalPages>listData.currentPage" style="text-align: center;color:gray">
                        <span @click="loadMore">加载更多</span>
                    </p>
                </template>
                <template v-else>
                    <p style="text-align: center;margin-top: 2em;">未找到符合条件的咨询师</p>
                </template>
            </section>


        </div>
        <EmergencyConsultModal ref="emergencyConsult" @consult="consult"></EmergencyConsultModal>
        <Agreement ref="agreement"></Agreement>
        <loading :show="isLoading" ></loading>


    </section>

</template>

<script>
    //TODO 需要添加领域
    import {ChinaAddressV4Data} from 'vux'
    import {Util} from '../../assets/js/Util'
    import Role from '../../assets/js/Role'
    import {SEX} from "../../assets/js/constants/constant"
    import EmergencyConsultModal from '../components/EmergencyConsultModal'
    import MyPopupPicker from '../../components/MyPopupPicker'
    import Agreement from '../../components/Agreement'

    export default {
        components: {
            EmergencyConsultModal,
            MyPopupPicker,
            Agreement
        },
        data() {
            return {
                addressData: ChinaAddressV4Data,
                address: [],
                formItem: {},
                genderOptions: [{
                    value: 'male',
                    name: '男'
                }, {
                    value: 'female',
                    name: '女'
                },],
                qualificationOptions: undefined,
                schoolTypeOptions: undefined,
                mannerTypeOptions: undefined,
                defaultValue: [],
                list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
                qualificationTypeObj: {},
                schoolTypeObj: {},
                mannerTypeObj: {},
                isEmergency: this.$route.query.isEmergency ? true : false,
                SEX,
                therapistList: [],
                consult_type_id: this.$route.query.consult_type_id,
                manner_type_id: this.$route.query.manner_type_id,
                listData:{},
                isLoading:false,


            }
        },
        computed: {},
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.getBaseInfo()
            },
            getBaseInfo(){
                this.isLoading=true;
                Promise.all([
                    this.http.post('qualificationtype/list', {}),
                    this.http.post('schooltype/list', {}),
                    this.http.post('mannertype/list', {})
                ]).then((data) => {
                    this.isLoading=false;
                    this.qualificationTypeObj = Util.array2Object(data[0], 'qualification_type_id')
                    this.schoolTypeObj = Util.array2Object(data[1], 'school_type_id')
                    this.mannerTypeObj = Util.array2Object(data[2], 'manner_type_id')

                    this.qualificationOptions = Util.getPopupPickerOptions(data[0], 'qualification_type_id', 'qualification_type_name')
                    this.schoolTypeOptions = Util.getPopupPickerOptions(data[1], 'school_type_id', 'school_type_name')
                    this.mannerTypeOptions = Util.getPopupPickerOptions(data[2], 'manner_type_id', 'manner_type_name')


                }).catch(err => {
                    this.$vux.toast.text(err)
                    this.isLoading=false;
                });
            },
            //紧急咨询回调
            consult() {
                //TODO 后续流程呢？
            },

            getList(page,isLoadmore) {


                page = page || 1;

                let pageSize = Util.pageSize

                let whereObj = {
                    role: Role.therapist,
                    page,
                    pageSize:2,
                }

                Object.assign(whereObj,this.formItem)

                this.isLoading=true;

                this.http.post('user/list', whereObj).then((data) => {

                    this.listData=data;
                    if(isLoadmore){
                        this.therapistList=this.therapistList.concat(data.data)
                    }else{
                        this.therapistList=data.data
                    }
                    this.isLoading=false;

                }).catch(err => {
                    this.$vux.toast.text(err)
                    this.isLoading=false;
                })
            },
            loadMore(){
                this.getList(this.listData.currentPage+1,true);
            },

            detail(item) {

                this.$router.push({
                    path: '/therapist/detail',
                    query: {
                        therapist_id: item.therapist_id
                    }
                })

            },
            next(item) {

                //TODO 紧急咨询时填原因

                //TODO 判断是否平台黑名单或所选咨询师的黑名单，是的话无法继续预约。分两次判断，当前所选咨询师黑名单的话可以切换咨询师

                //TODO 判断是否首次预约，首次的话需要同意隐私条款。隐私条款每条都需要同意吗？类似复选框都选中？还是确定一条之后依次出现下一条。这样是否太变态了？

                if (this.isEmergency) {

                    this.$refs.emergencyConsult.show()

                } else {
                    let obj={
                        therapist_id: item.therapist_id
                    }
                    this.$router.push({
                        path: '/appoint/selectDate',
                        query: {
                            therapist_id: item.therapist_id,
                            consult_type_id: this.consult_type_id,
                            manner_type_id: this.manner_type_id
                        }
                    })
                }

            },


        }
    }
</script>

<style scoped>



</style>
