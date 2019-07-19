<template>


    <div>
        <Table stripe :columns="columns" :data="dataList"></Table>

    </div>


</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        type:'index',
                        width:30,
                        align:'center'
                    },
                    {
                        title: '问卷名称',
                        key: 'name'
                    },

                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.detail(params)
                                        }
                                    }
                                },params.row.finish===0?'开始答题':params.row.finish===1?'继续答题':'查看')
                            ])
                        }
                    }

                ],
                dataList: [],
            }
        },
        watch:{
            dataList(val){

            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                this.http.post('appointmobile/list', {}).then(data => {

                    this.dataList = data.data;
                }).catch(error=>{

                    this.$Message.error(error)
                })
            },
            detail(params){
                this.$router.push({
                    path:'/paper/detail',
                    query:{
                        paperId:params.row.id,
                    }
                })
            },
        }
    }
</script>

<style scoped>
</style>
