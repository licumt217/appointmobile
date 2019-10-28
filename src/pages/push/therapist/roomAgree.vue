<template>


    <section class="">
        





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
            this.getDetail();
        },
        methods: {
            getDetail() {


            },

        }
    }
</script>

<style scoped>




</style>
