<template>

    <popup v-model="isShow" >

        <Divider>接受预约</Divider>

        <section >
            <checker v-model="assign_room_type" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item :value="0" :key="0">自动分配房间</checker-item>
                <checker-item :value="1" :key="1">手动分配房间</checker-item>
            </checker>

        </section>

        <section style="margin-top: 1em;" v-if="assign_room_type===1">
            <checker v-model="room_id" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item v-for="room in roomList" :value="room.id" :key="room.id" style="margin-right:.2em;">{{room.name}}</checker-item>
            </checker>
        </section>

        <flexbox style="margin-top: 1.5em;margin-bottom: 1em;">
            <flexbox-item style="text-align: center">
                <x-button plain @click.native="isShow=false">取消</x-button>
            </flexbox-item>
            <flexbox-item style="text-align: center">
                <x-button plain type="primary" @click.native="accept">确定</x-button>
            </flexbox-item>
        </flexbox>


    </popup>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                assign_room_type:0,//房间分配类型。
                isShow:false,
                form:{},
                room_id:'',
                rules: {
                    content: [
                        {required: true, message: "请输入反馈内容", trigger: "blur"}
                    ],
                },
                roomList:[],
                allRoomList:[],
                appointment:{}
            }
        },
        props: {
        },
        computed: {},
        watch:{
        },
        mounted() {
            this.getRooms();
        },
        methods: {
            show(appointment){
                this.appointment=appointment;
              this.isShow=true;
            },
            hide(){
              this.isShow=false;
            },
            getRooms(){

                let sets=[1,2,3,4,5,6,9,10,11]
                this.http.post('room/listNoPage', {
                }).then((data) => {
                    this.allRoomList=data;

                    let stationRooms=[{
                        period:'10',
                        room_id:'0172e0c0dea64abdab0904020caae98a',
                        appoint_date:'2020-04-17 00:00:00',
                    },{
                        period:'11,12,13,16',
                        room_id:'0172e0c0dea64abdab0904020caae98a',
                        appoint_date:'2020-05-17 00:00:00',
                    },{
                        period:'8,9',
                        room_id:'0172e0c0dea64abdab0904020caae98a',
                        appoint_date:'2020-04-18 00:00:00',
                    }]


                    console.log(data.length)

                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },
            accept(){

                if(this.assign_room_type===1 && !this.room_id){
                    this.$vux.toast.text("请选择房间！")
                    return;
                }


                return;
                this.http.post('appointment/accept', {
                    appointment_id: this.appointment_id,
                    room_id:this.room_id,
                    assign_room_type:this.assign_room_type,
                }).then((data) => {
                    this.$vux.toast.text("操作成功")
                    this.hide();
                    this.$emit('callback')

                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },

            init() {

            },

        }
    }
</script>

<style lang="less">
    .demo1-item {
        border: 1px solid #cccccc;
        padding: 5px 15px;
    }
    .demo1-item-selected {
        border: 1px solid green;
    }
</style>