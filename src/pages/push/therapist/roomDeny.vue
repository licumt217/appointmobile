<template>


    <section class="">

        <Card>
            <p slot="title">房间申请拒绝通知</p><!---->
            <p>预约名称：总是失眠咨询</p>
            <p>预约地点：北京市五道口宇宙中心</p>
            <p>预约时间：2019/12/20</p>
            <p>案例管理者：曹操</p>
            <p>审核状态：拒绝</p>
            <p>原因：此房间已被占用</p>
        </Card>




    </section>

</template>

<script>
    import {Util} from '../../../assets/js/Util'
    import {SCHOOL_TYPE,QUALIFICATION_TYPE,SEX} from "../../../assets/js/constants/constant"
    export default {
        components:{
        },
        data() {
            return {
                SCHOOL_TYPE,
                QUALIFICATION_TYPE,
                SEX,
                person: {
                    name: '张老师',
                    sex: 'male',
                    qualification_type: '1',
                    school_type: '1'
                },


            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            agree() {
                alert("同意")

            },
            deny() {
                alert("拒绝")

            },

        }
    }
</script>

<style scoped>




</style>
