<template>


    <section class="">
        <div class="mainContent">
            <div class="appointType" style="margin-top: 2em;margin-left: 0.5em;">
                <p style="font-size: 14px;font-weight:bold;margin-bottom: 5px;">预约类型</p>
                <RadioGroup v-model="appointType" vertical style="margin-left: 1em;">
                    <Radio label="personal">
                        <Icon type="social-apple"></Icon>
                        <span>个体</span>
                    </Radio>
                    <Radio label="family">
                        <Icon type="social-android"></Icon>
                        <span>家庭</span>
                    </Radio>
                    <Radio label="group">
                        <Icon type="social-windows"></Icon>
                        <span>团体</span>
                    </Radio>
                    <Radio label="marriage">
                        <Icon type="social-windows"></Icon>
                        <span>婚姻</span>
                    </Radio>
                    <Radio label="education">
                        <Icon type="social-windows"></Icon>
                        <span>心理教育</span>
                    </Radio>
                </RadioGroup>
                <div class="tip" style="padding:1em 1em 0 1em;" v-show="appointType==='family'">
                    您只能为自己和家人预约家庭或婚姻治疗，或为您的被监护人预约个体治疗，后者包括您的未成年子女或其他无民事能力的家庭成员。
                </div>
            </div>

            <div class="mannerType" style="margin-top:1em;margin-left: 0.5em;">
                <p style="font-size: 14px;font-weight:bold;margin-bottom: 5px;">咨询方式</p>
                <RadioGroup v-model="mannerType" vertical style="margin-left: 1em;">
                    <Radio label="1">
                        <Icon type="social-apple"></Icon>
                        <span>线上</span>
                    </Radio>
                    <Radio label="2">
                        <Icon type="social-android"></Icon>
                        <span>线下</span>
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
                appointType: 'family',
                mannerType: '1',


            }
        },
        computed: {},
        mounted() {
        },
        methods: {

            next() {

                this.$router.push('/therapistList')

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
