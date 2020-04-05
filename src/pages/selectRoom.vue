<template>


    <section class="">
        <div style="padding:1em;">

            <h3 style="margin-bottom: 1em;">选择房间</h3>

            <RadioGroup v-model="roomType">
                <Radio label="auto">随机</Radio>
                <Radio label="manual">手动指定</Radio>
            </RadioGroup>

            <div style="margin-top: 2em;" v-if="roomType==='manual'">
                <RadioGroup v-model="roomNumber" type="button">
                    <Radio v-for="room in roomList" :label="room.roomId">{{room.roomName}}</Radio>
                </RadioGroup>
            </div>

            <Button type="primary" long @click="confirm" style="margin-top: 2em;">确定</Button>
        </div>



    </section>

</template>

<script>
    import {Util} from '../assets/js/Util'

    export default {
        data() {
            return {
                roomNumber:1,
                roomList:[{
                    roomId:1,
                    roomName:'房间1'
                },{
                    roomId:2,
                    roomName:'房间2'
                },{
                    roomId:3,
                    roomName:'房间3'
                },{
                    roomId:4,
                    roomName:'房间4'
                },{
                    roomId:5,
                    roomName:'房间5'
                }],
                roomType:'auto',

                period: 2
            }
        },
        computed: {},
        mounted() {
        },
        methods: {

            //接口成功后需要给案例管理者发送推送消息
            confirm() {

                this.$router.push('/user/myAppoint')

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
