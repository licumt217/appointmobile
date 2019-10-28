<template>


    <section class="">

        <Card>
            <p slot="title">紧急咨询确认通知</p><!---->
            <p>预约名称：总是失眠咨询</p>
            <p>预约地点：北京市五道口宇宙中心</p>
            <p>预约时间：2019/12/20</p>
            <p>用户：贾静雯</p>
            <p>原因：我特别难过，每天都想着自杀，天天痛不欲生！</p>
            <div style="margin-top: 1em;">
                <Button @click="agree" style="margin-right: 2em;">接受预约</Button>
                <Button type="error" @click="deny">拒绝预约</Button>
            </div>
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
                alert("接受")

            },
            deny() {
                alert("拒绝")

            },

        }
    }
</script>

<style scoped>




</style>
