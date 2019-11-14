<template>


    <section class="">
        <div class="mainContent">
            <div class="appointType" style="margin-top: 2em;margin-left: 0.5em;">
                <p style="font-size: 14px;font-weight:bold;margin-bottom: 5px;">咨询类型</p>
                <RadioGroup v-model="consult" vertical style="margin-left: 1em;">
                    <Radio :label="item" v-for="item in consultTypeList">
                        <Icon type="social-apple"></Icon>
                        <span>{{item.consult_type_name}}</span>
                    </Radio>
                </RadioGroup>
                <div class="tip" style="padding:1em 1em 0 1em;" v-show="consult.remark">
                    {{consult.remark}}
                </div>
            </div>

            <div class="mannerType" style="margin-top:1em;margin-left: 0.5em;">
                <p style="font-size: 14px;font-weight:bold;margin-bottom: 5px;">咨询方式</p>
                <RadioGroup v-model="manner_type_id" vertical style="margin-left: 1em;">
                    <Radio :label="item.manner_type_id" v-for="item in mannerTypeList">
                        <Icon type="social-apple"></Icon>
                        <span>{{item.manner_type_name}}</span>
                    </Radio>
                </RadioGroup>
            </div>

            <div style="margin-top: 2em;">
                <Button type="primary" long @click="next">下一步</Button>
            </div>




        </div>



    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'

    export default {
        data() {
            return {
                consultTypeList:[],
                mannerTypeList:[],
                manner_type_id: '',
                consult: '',


            }
        },
        computed: {},
        mounted() {
            this.getMannerTypeList()
            this.getConsultTypeList()
        },
        methods: {

            getConsultTypeList(){
                this.http.post('consulttype/list', {}).then((data) => {

                    this.consultTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getMannerTypeList(){
                this.http.post('mannertype/list', {}).then((data) => {

                    this.mannerTypeList = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },


            next() {
                if(!this.consult){
                    this.$Message.warning("请选择咨询类型！")
                    return ;
                }

                if(!this.manner_type_id){
                    this.$Message.warning("请选择咨询方式！")
                    return ;
                }


                this.$router.push({


                    path:'/therapistList',
                    query:{
                        consult_type_id:this.consult.consult_type_id,
                        manner_type_id:this.manner_type_id,

                    }
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
