<template>

    <div class="login-wrap">
        <Button type='primary' @click="go">开始回答</Button>



    </div>

</template>

<script>
    export default {
        data() {
            return {
            }
        },
        components:{
        },
        computed: {
        },
        mounted() {


            // if(!this.$store.state.userInfo.userGroup){
            //     this.$refs.selectUserGroup.show();
            // }
        },
        methods: {
            go(){
                this.$router.push("/paper/detail")
            }
        }
    }
</script>

<style scoped>


</style>
