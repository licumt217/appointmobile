<template>
    <Modal
            v-model="isShow"
            :closable="false"
            :mask-closable="false"
            title="选择用户组"
            >

        <Row>
            <Col span="18" >
                <Form ref="form" :model="formItem" :label-width="80">
                    <FormItem label="用户组" prop="userGroup">
                        <Select v-model="formItem.userGroup">
                            <Option v-for="item in userGroupList" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>

            </Col>

        </Row>
        <div slot="footer">
            <Button type="primary" @click="ok">确定</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                isShow:false,
                formItem: {
                    userGroup:'',

                },
                userGroupList:[],
                callback:null

            }
        },
        mounted(){
            this.getUserGroupList()
        },
        methods: {
            getUserGroupList(){
                this.http.post('user/listGroup', {currentPage:1,pageSize:10}).then(data => {

                    this.userGroupList = data.data;
                })
            },

            ok() {

                if(this.formItem.userGroup){
                    this.http.post('user/update', {
                        id:sessionStorage.question_userId,
                        userGroup:this.formItem.userGroup
                    }).then((data) => {

                        sessionStorage.userInfo=JSON.stringify(data.data[0])

                        this.$Message.success("设置成功！")

                        this.hide()

                        if(this.callback){
                            this.callback()
                        }


                    }).catch(err => {
                        this.$Message.error(err)
                    })
                }else{
                    this.$Message.warning("请选择用户组！")
                }

            },
            show(callback){
                this.callback=callback
                this.isShow=true;
            },
            hide(){
                this.isShow=false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
