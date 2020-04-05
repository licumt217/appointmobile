<template>


    <section class="">
        <Collapse accordion>
            <Panel name="emergencyPerson">
                紧急联系人设置
                <div slot="content">
                    <Card v-for="person in list" style="margin-bottom: 0.5em;">
                        <p slot="title">
                            {{person.name}}
                        </p>
                        <div class="base_info">
                            <p>关系：{{person.relation}}</p>
                            <p>手机号：{{person.phone}}</p>
                            <p>电子邮件：{{person.email}}</p>
                        </div>
                        <flexbox style="margin-top: .5em;">
                            <flexbox-item>
                                <x-button class="long_btn" mini plain type="warn" @click.native="remove(person)">删除联系人
                                </x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button class="long_btn" mini plain type="primary" @click.native="showModal(person)">
                                    修改联系人
                                </x-button>
                            </flexbox-item>
                        </flexbox>

                    </Card>
                    <div v-show="list.length<3">
                        <x-button plain @click.native="showModal">添加联系人</x-button>
                    </div>
                </div>
            </Panel>
            <Panel name="2">
                其它设置
                <p slot="content">
                    斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary
                </p>
            </Panel>
        </Collapse>

        <EmergencyPerson ref="emergencyPerson" @done="init"></EmergencyPerson>


    </section>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    import EmergencyPerson from '../../components/EmergencyPerson'

    export default {
        components: {
            EmergencyPerson
        },
        data() {
            return {
                list: [],
            }
        },
        computed: {},
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getList()
            },
            getList() {
                this.http.post('emergencyContack/list', {
                    user_id: sessionStorage.user_id
                }).then((data) => {

                    this.list = data;

                }).catch(err => {
                    this.$Message.error(err)
                })
            },
            showModal(person) {
                this.$refs.emergencyPerson.show(person)
            },

            remove(person) {
                this.$Modal.confirm({
                    title: '您确定删除吗？',
                    content: '',
                    onOk: () => {
                        this.http.post('emergencyContack/delete', {
                            emergency_contack_id: person.emergency_contack_id
                        }).then((data) => {
                            this.$Message.success("操作成功！");
                            this.init();

                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    },
                    onCancel: () => {
                    }
                })
            },


        }
    }
</script>

<style scoped lang="less">


    .base_info {
        p {
            line-height: 1.8em;
        }
    }


</style>
