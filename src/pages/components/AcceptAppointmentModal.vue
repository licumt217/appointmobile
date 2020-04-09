<template>

    <popup v-model="isShow">

        <Divider>接受预约</Divider>

        <section>
            <checker v-model="assign_room_type" default-item-class="demo1-item"
                     selected-item-class="demo1-item-selected">
                <checker-item :value="0" :key="0">自动分配房间</checker-item>
                <checker-item :value="1" :key="1">手动分配房间</checker-item>
            </checker>

        </section>

        <section style="margin-top: 1em;" v-if="assign_room_type===1">
            <template v-if="roomList.length>0">
                <checker v-model="room_id" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                    <checker-item v-for="room in roomList" :value="room.room_id" :key="room.room_id" style="margin-right:.2em;">
                        {{room.name}}
                    </checker-item>
                </checker>
            </template>
            <template v-else>
                <div style="padding-left:1em;">
                    无可用房间
                </div>
            </template>

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
    import DateUtil from "../../assets/js/DateUtil";

    export default {
        name: '',
        data() {
            return {
                assign_room_type: 0,//房间分配类型。
                isShow: false,
                form: {},
                room_id: '',
                rules: {
                    content: [
                        {required: true, message: "请输入反馈内容", trigger: "blur"}
                    ],
                },
                roomList: [],
                allRoomList: [],
                appointment: {},
                allAvailablePeriodArray:[],

            }
        },
        methods: {
            show(appointment) {
                this.roomList=[];
                this.appointment = appointment;
                this.isShow = true;


                this.getRoomPeriodSet().then(data=>{
                    this.getRooms();
                });
            },
            hide() {
                this.isShow = false;
            },
            /**
             * 获取工作室下的房间可用时段设置
             * */
            getRoomPeriodSet(){
                return new Promise((resolve, reject)=>{
                    this.http.post('roomPeriodSet/getByStationId', {
                        station_id:this.appointment.station_id
                    }).then((data) => {
                        this.allAvailablePeriodArray=data.period.split(',');

                        resolve();

                    }).catch(err => {
                        this.$vux.toast.text(err)
                    })
                })
            },
            isRoomPeriodsContainsAppointPeriods(){

                let periods=this.appointment.period.split(',')

                let flag=true;
                for(let i=0;i<periods.length;i++){
                    if(!this.allAvailablePeriodArray.includes(periods[i])){
                        flag=false;
                        break;
                    }
                }
                return flag;
            },
            getRooms() {

                this.http.post('room/listByTherapistNoPage', {
                    therapist_id:this.appointment.therapist_id
                }).then((data) => {
                    this.allRoomList = data;

                }).then(() => {
                    this.http.post('appointment/getListOfUsingByStationId', {
                        station_id:this.appointment.station_id
                    }).then((data) => {

                        //说明没有别人占用的，所有都可以预约
                        if (data.length === 0 && this.isRoomPeriodsContainsAppointPeriods()) {
                            this.roomList=this.allRoomList;
                        } else {

                            let weekMap = {}
                            let singleMap = {}
                            data.forEach(item => {

                                let date = new Date(item.appoint_date)

                                let week = DateUtil.getWeekOfDate(date)

                                let periodArray = item.period.split(',')

                                //持续的预约
                                if (item.ismulti === 1) {
                                    if (weekMap[week]) {
                                        weekMap[week] = weekMap[week].concat(periodArray);
                                    } else {
                                        weekMap[week] = periodArray
                                    }
                                } else {//单次预约
                                    if (singleMap[date]) {
                                        singleMap[date].concat(periodArray);
                                    } else {
                                        singleMap[date] = periodArray
                                    }
                                }
                            })


                            this.allRoomList.forEach((item, index) => {

                                let week = DateUtil.getWeekOfDate(this.appointment.appoint_date);

                                if(this.canAppointRoom(this.appointment,singleMap,weekMap[week])){
                                    this.roomList.push(item);
                                }

                            })



                        }

                    })

                }).catch(err => {
                    this.$vux.toast.text(err)
                })
            },
            /**
             * 看给定日期能否预约房间
             * @param date
             * @param usedPeriodArray 已经长期预约的时段，此时不可用
             * @returns {[]}
             */
            canAppointRoom(appointment, singleMap, usedPeriodArray) {

                let periodDateMap = {}

                let dateWeek = DateUtil.getWeekOfDate(appointment.appoint_date)

                for (let date2 in singleMap) {
                    date2=new Date(date2)
                    let w = DateUtil.getWeekOfDate(date2)


                    let period2 = singleMap[date2]
                    if (w === dateWeek) {
                        period2.forEach(item => {
                            if (periodDateMap[item]) {
                                if (periodDateMap[item].getTime() < date2.getTime()) {
                                    periodDateMap[item] = date2;
                                }
                            } else {
                                periodDateMap[item] = date2;
                            }
                        })
                    }
                }

                let appoint_periods=this.appointment.period.split(',');
                let flag=true;
                for(let m=0;m<appoint_periods.length;m++){
                    let the_period=appoint_periods[m];

                    if(usedPeriodArray && usedPeriodArray.includes(the_period)){
                        flag=false;
                        break;
                    }

                    if(periodDateMap[the_period] && new Date(this.appointment.appoint_date).getTime() < periodDateMap[the_period].getTime()){
                        flag=false;
                        break;
                    }

                }

                return flag && this.isRoomPeriodsContainsAppointPeriods();


            },
            accept() {

                if (this.assign_room_type === 1 && !this.room_id) {
                    this.$vux.toast.text("请选择房间！")
                    return;
                }


                this.http.post('appointment/accept', {
                    appointment_id: this.appointment.appointment_id,
                    room_id: this.room_id,
                    assign_room_type: this.assign_room_type,
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