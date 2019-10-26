<template>


    <div class="">
        <Card>
            <p slot="title">预约详情</p>
            <p>预约名称：总是失眠咨询</p>
            <p>预约地点：北京市五道口宇宙中心</p>
            <p>预约时间：2019/12/20</p>
            <p>咨询师：范冰冰</p>
            <div style="margin-top: 1em;">
                <Button size="small" type="error" @click="cancel">取消预约</Button>
                <Button size="small" small type="success" @click="showFeedbackModal">咨询效果反馈</Button>
                <Button size="small"  type="error" @click="showComplainModal">投诉咨询师</Button>
            </div>
        </Card>

        <ComplainModal ref="complainModal" @complain="complain"></ComplainModal>
        <FeedbackModal ref="feedbackModal" @feedback="feedback"></FeedbackModal>



    </div>

</template>

<script>
    import {Util} from '../assets/js/Util'
    import ComplainModal from './components/ComplainModal'
    import FeedbackModal from './components/FeedbackModal'
    export default {
        components:{
            ComplainModal,
            FeedbackModal
        },
        data() {
            return {
                formItem: {
                },
                rules: {
                    sex: [
                        {required: true, message: "性别不能为空", trigger: "change"}
                    ],
                    email: [
                        {required: true, message: "电子邮箱不能为空", trigger: "blur"}
                    ],
                },
                columns1: [
                    {
                        title: '预约名称',
                        key: 'name'
                    },
                    {
                        title: '预约时间',
                        key: 'date'
                    }
                ],
                data1: [
                    {
                        name: '工作预约太累咨询',
                        date: '2016-10-03'
                    },
                    {
                        name: '心理阴影咨询',
                        date: '2016-10-01'
                    },
                    {
                        name: '总是犯困预约',
                        date: '2016-10-02'
                    },
                    {
                        name: '总是犯困预约',
                        date: '2016-10-02'
                    },
                    {
                        name: '总是犯困预约',
                        date: '2016-10-02'
                    }
                ]
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            complain(){
                alert(3)
            },
            feedback(){
                alert(2)
            },
            showComplainModal(){
                this.$refs.complainModal.show();
            },
            showFeedbackModal(){
                this.$refs.feedbackModal.show();
            },

            /**
             * 24小时内能取消（已支付的直接退款
             * 24小时外不能退款）
             */
            cancel(){
                this.$Modal.confirm({
                    title: '您确定取消吗？',
                    content: '',
                    onOk: () => {
                        this.$Message.success("取消预约成功！");
                    },
                    onCancel: () => {
                    }
                })
            },




        }
    }
</script>

<style scoped>



</style>
