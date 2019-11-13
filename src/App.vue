<template>
    <div class="layout" :class="{'layout_notlogin':!isLogin}">
        <div class="login" v-if="!isLogin">
            <router-view></router-view>
        </div>
        <Layout :class="{'layout_notlogin':!isLogin}" v-else>
            <Header :style="{position: 'fixed', top:'0',width: '100%' ,zIndex:10,height:'48px',lineHeight:'48px'}" v-show="isLogin">
                <Menu mode="horizontal" theme="dark" active-name="1" @on-select="operate" style="height:48px;line-height: 48px;">
                    <div class="layout-nav">

                        <template v-if="userType===0">
                            <MenuItem name="report">
                                <Icon type="ios-navigate"></Icon>
                                报告
                            </MenuItem>
                            <MenuItem name="paper">
                                <Icon type="ios-navigate"></Icon>
                                问卷
                            </MenuItem>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-stats"/>
                                    个人信息
                                </template>
                                <MenuItem name="detail">查看信息</MenuItem>
                                <MenuItem name="passModify">修改密码</MenuItem>
                                <MenuItem name="logout" >退出登录</MenuItem>
                            </Submenu>
                        </template>

                    </div>
                </Menu>
            </Header>

            <Content :style="{margin: '54px 5px 0', background: '#FFF'}" >
                <router-view></router-view>
            </Content>

            <!--<Footer class="layout-footer-center" v-show="isLogin">2011-2016 &copy; TalkingData</Footer>-->

            <Pass ref="pass" :isShow="isShowPassModifyModal"></Pass>


        </Layout>
    </div>
</template>

<script>
    import Pass from './components/PasswordModify'
    import {Util} from './assets/js/Util'
    export default {
        name: 'app',
        data() {
            return {
                isCollapsed: false,
                isShowPassModifyModal:false,
                userType:0,//用户类型：管理员和普通用户
            }
        },
        components:{
          Pass
        },
        watch: {
            $route (to, from) {


                // if (!this.isLogin && (to.path !== '/user/register' && to.path !== '/user/login')) {
                //     this.$router.push('/user/login')
                // }
            },
        },
        computed: {

            menuList(){
                return this.$store.state.menuList;
            },
            activeMenuName(){
                return this.$store.state.activeMenuName;
            },
            username(){
                return this.$store.state.username;
            },
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        methods: {

            operate(name){

                switch (name) {
                    case 'paper'://回答问卷
                        this.$router.push('/paper/list')
                        break;
                    case 'logout':

                        this.http.post('login/logout',{
                        }).then(()=>{
                            this.$store.commit('reset')
                            this.$router.push('/user/login')
                        }).catch(error=>{
                            this.$Message.error(error)
                        })

                        break;

                    case 'passModify':
                        this.$refs.pass.show();
                        break;

                    case 'detail':

                        this.http.post('user/getById', {
                            user_id:this.$store.state.user_id
                        }).then((data) => {

                            this.$router.push({
                                path:'/user/operate',
                                query:{
                                    opType:'edit',
                                    formItem:data.data[0]
                                }
                            })

                        }).catch(err => {
                            this.$Message.error(err)
                        })

                        break;

                    case 'report':
                        this.$router.push('/report/list')
                        break;

                }

            },
            go2UserDetail(){
                this.$router.push('/user/detail')
            },





        },
        mounted() {



        }
    }
</script>

<style>
    body {
        /*overflow: hidden;*/
    }
    .ivu-layout{
        background: #FFF!important;
    }

    .layout_notlogin {
        border: none!important;
        background: #fff !important;
    }

    /*.layout-header-bar {*/
        /*background: #fff !important;*/
        /*box-shadow: 0 1px 1px rgba(0, 0, 0, .1);*/
    /*}*/

    /*.layout-logo-left {*/
        /*width: 90%;*/
        /*height: 30px;*/
        /*background: #5b6270;*/
        /*border-radius: 3px;*/
        /*margin: 15px auto;*/
    /*}*/

    /*.menu-icon {*/
        /*transition: all .3s;*/
    /*}*/

    /*.rotate-icon {*/
        /*transform: rotate(-90deg);*/
    /*}*/

    /*.menu-item span {*/
        /*display: inline-block;*/
        /*overflow: hidden;*/
        /*width: 69px;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
        /*vertical-align: bottom;*/
        /*transition: width .2s ease .2s;*/
    /*}*/

    /*.menu-item i {*/
        /*transform: translateX(0px);*/
        /*transition: font-size .2s ease, transform .2s ease;*/
        /*vertical-align: middle;*/
        /*font-size: 16px;*/
    /*}*/

    /*.collapsed-menu span {*/
        /*width: 0px;*/
        /*transition: width .2s ease;*/
    /*}*/

    /*.collapsed-menu i {*/
        /*transform: translateX(5px);*/
        /*transition: font-size .2s ease .2s, transform .2s ease .2s;*/
        /*vertical-align: middle;*/
        /*font-size: 22px;*/
    /*}*/

    .hidden {
        display: none;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        width: auto!important;
    }
     /*.ivu-menu-horizontal .ivu-menu-submenu {*/
        /*float: right!important;*/
         /*display: inline-block!important;*/
    /*}*/









    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        /*overflow: hidden;*/
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 510px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }

</style>
