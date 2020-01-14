<template>

    <div>
        <group title="修改密码">
            <x-input type="password" ref="password" :placeholder="'请输入原始密码'"
                     placeholder-align="right"
                     v-model="formItem.password">
                <div slot="label" style="width:6em;">
                    原始密码<span style="color:red;">*</span>
                </div>
            </x-input>

            <x-input type="password" ref="password" :placeholder="'请输入新密码'"
                     placeholder-align="right"
                     v-model="formItem.newPassword">
                <div slot="label" style="width:6em;">
                    新密码<span style="color:red;">*</span>
                </div>
            </x-input>

            <x-input type="password" ref="password" :placeholder="'请输入确认新密码'"
                     placeholder-align="right"
                     v-model="formItem.confirmPassword">
                <div slot="label" style="width:6em;">
                    确认新密码<span style="color:red;">*</span>
                </div>
            </x-input>


            <x-button text="修改" class="long_btn" type="primary" @click.native="ok"></x-button>
            <x-button text="返回" class="long_btn" @click.native="back"></x-button>

        </group>


    </div>

</template>

<script>

    export default {
        data() {
            return {
                phone: '',
                formItem: {
                    password: '',
                    newPassword: '',
                    confirmPassword: '',

                },

            }
        },

        methods: {
            back() {
                this.$router.go(-1)
            },
            isValid() {

                if (!(this.formItem.password)) {
                    this.$vux.toast.text('请输入原始密码！', 'middle')
                    return false;
                }

                if (!(this.formItem.newPassword)) {
                    this.$vux.toast.text('请输入新密码！', 'middle')
                    return false;
                }

                if (!(this.formItem.confirmPassword)) {
                    this.$vux.toast.text('请输入确认新密码！', 'middle')
                    return false;
                }

                return true;


            },

            ok() {
                if (this.isValid()) {

                    //新密码和原始密码不能相同
                    if (this.formItem.password === this.formItem.newPassword) {
                        this.$vux.toast.text('新密码不能和原始密码相同！', 'middle')
                        return;
                    }

                    //新密码和确认密码必须相同

                    if (this.formItem.newPassword !== this.formItem.confirmPassword) {
                        this.$vux.toast.text('新密码和确认密码不相同！', 'middle')
                        return;
                    }


                    this.http.post('user/updatePassword', {
                        id: this.$store.state.userId,
                        password: this.formItem.password,
                        newPassword: this.formItem.newPassword,
                        confirmPassword: this.formItem.confirmPassword,
                    }).then(() => {
                        this.$vux.toast.text('密码修改成功，请重新登录', 'middle')
                        this.$store.commit("isLogin", false)
                        this.$router.push('/login')
                    }).catch(err => {
                        this.$vux.toast.text(err, 'middle')

                    })

                }
            },
        }
    }
</script>

<style scoped>


</style>
