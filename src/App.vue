<template>
    <div class="total_container ">
        {{message}}

        <div class="login" v-if="!isLogin">
            <router-view></router-view>
        </div>

        <div v-else>

            <x-header style="position: fixed;top:0;width:100%;z-index: 1;height: 48px;" :right-options="{showMore: true}" @on-click-more="showMenus = true"></x-header>
            <section class="content mainContent" style="margin-top:48px; " >
                <router-view></router-view>
            </section>

        </div>

        <div>
            <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="operate"></actionsheet>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                isCollapsed: false,
                isShowPassModifyModal: false,
                userType: 0,//用户类型：管理员和普通用户
                showMenus:false,
                menus:{
                    'myAppoint':'我的预约',
                    'appointHistory':'预约记录',
                    'setting':'设置',
                    'personalCenter':'个人信息',
                    'logout':'退出登录',
                }
            }
        },
        components: {},
        watch: {
            $route(to, from) {





            },
            message(val){
                alert(val)
            }
        },
        computed: {

            menuList() {
                return this.$store.state.menuList;
            },
            activeMenuName() {
                return this.$store.state.activeMenuName;
            },
            username() {
                return this.$store.state.username;
            },
            isLogin() {
                return this.$store.state.isLogin;
            },
            message() {
                if(this.$store.state.message){
                    let msg=String(this.$store.state.message)
                    this.$Message.warning(msg)
                    this.$store.commit('message','')
                }
                return this.$store.state.message;
            },
        },
        methods: {

            operate(name) {

                console.log(name)

                switch (name) {
                    case 'myAppoint'://
                        this.$router.push('/appoint/myAppoint')
                        break;
                    case 'logout':

                        this.http.post('login/unbind', {}).then(() => {
                            this.$store.commit('reset')
                            this.$router.push('/user/login')
                        }).catch(err => {
                            this.$vux.toast.text(err)
                        })

                        break;

                    case 'passModify':
                        this.$router.push({
                            path: '/user/modifypass',
                        })
                        break;

                    case 'personalCenter':

                        this.$router.push({
                            path: '/user/center',
                        })

                        break;

                    case 'appointHistory':
                        this.$router.push('/appoint/history')
                        break;
                    case 'setting':
                        this.$router.push('/user/setting')
                        break;


                }

            },
            go2UserDetail() {
                this.$router.push('/user/detail')
            }

        },
        mounted() {


        }
    }
</script>
<style lang="less">
    @import './assets/css/common.css';
    .total_container *{
        font-size: 14px;
        color:#222222;
    }
    .long_btn{
        width:96% !important;
    }
    .weui-actionsheet__cell{
        font-size: 14px!important;
    }
    .vux-table td:before, .vux-table th:before{
        border-bottom: none!important;
    }
    header, nav, section, footer {
        min-width: 200px!important;
    }

    .mainContent {
        width: 98%;
        margin:0 auto;
        padding-top:.5em;
    }




</style>
