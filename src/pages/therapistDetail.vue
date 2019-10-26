<template>


    <section class="">
        <Card style="margin-bottom: 0.5em;">
            <p slot="title">
                {{person.name}}
            </p>
            <p>性别：{{SEX[person.sex]}}</p>
            <p>流派：{{SCHOOL_TYPE[person.school_type]}}</p>
            <p>资历：{{QUALIFICATION_TYPE[person.qualification_type]}}</p>

        </Card>





    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'
    import {SCHOOL_TYPE,QUALIFICATION_TYPE,SEX} from "../assets/js/constants/constant"
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
            this.getDetail();
        },
        methods: {
            getDetail() {

                //TODO 接口获取详情

            },

        }
    }
</script>

<style scoped>




</style>
