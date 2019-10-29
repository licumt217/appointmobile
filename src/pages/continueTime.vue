<template>


    <section class="">
        <div class="mainContent" style="padding:1em;">

            <h3 style="margin-bottom: 1em;">设置持续时间</h3>

            <RadioGroup v-model="continueType">
                <Radio label="current">本次</Radio>
                <Radio label="weeks">持续数周</Radio>
            </RadioGroup>

            <div style="margin-top: 2em;" v-if="continueType==='weeks'">
                <Slider v-model="period" :max="8"></Slider>
            </div>

            <Button type="primary" long @click="selectRoom" style="margin-top: 2em;">选择房间</Button>
        </div>



    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'

    export default {
        data() {
            return {
                continueType:'current',

                period: 2
            }
        },
        computed: {},
        mounted() {
        },
        methods: {

            selectRoom() {

                this.$router.push('/selectRoom')

            },


        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        background-size: 100% 100%;
    }

    .mainContent {
        width: 98%;
        margin-left: 1%;
        margin-bottom: 5%;
    }

    .ms-login {
        overflow: hidden;
        padding: 10px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }

    .signup-btn {
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }


</style>
