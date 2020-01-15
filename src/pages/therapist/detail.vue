<template>


    <section class="">
        <Card style="margin-bottom: 0.5em;">
            <p slot="title">
                {{person.name}}
            </p>
            <p>性别：{{SEX[person.gender]}}</p>
            <p>流派：{{schoolTypeObj[person.school_type_id].school_type_name}}</p>
            <p>资历：{{qualificationTypeObj[person.qualification_type_id].qualification_type_name}}</p>

        </Card>


    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    import {SEX} from "../../assets/js/constants/constant"

    export default {
        components: {},
        data() {
            return {
                therapist_id: this.$route.query.therapist_id,
                qualificationTypeObj: {},
                schoolTypeObj: {},
                SEX,
                person: {},


            }
        },
        computed: {},
        mounted() {
            this.getDetail();
            this.getQualificationTypeList()
            this.getSchoolTypeList()
        },
        methods: {
            getQualificationTypeList() {
                this.http.post('qualificationtype/list', {}).then((data) => {

                    this.qualificationTypeObj = Util.array2Object(data, 'qualification_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },

            getSchoolTypeList() {
                this.http.post('schooltype/list', {}).then((data) => {

                    this.schoolTypeObj = Util.array2Object(data, 'school_type_id')

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            getDetail() {

                this.http.post('therapist/getById', {
                    therapist_id: this.therapist_id
                }).then((data) => {

                    this.person = data;

                }).catch(err => {
                    this.$Message.error(err)
                })

            },

        }
    }
</script>

<style scoped>


</style>
