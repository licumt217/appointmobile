<template>
    <x-input :placeholder="placeholder" :placeholder-align="placeholderAlign" :max="max"
             v-model="model">
        <div slot="label" style="width: 5em;">
            <slot></slot>
            <span class="must" v-if="isMust">*</span>
        </div>
    </x-input>
</template>

<script>

    export default {
        data(){
            return {
                model:''
            }
        },
        watch: {
            model (val) {
                if(val){
                    this.$emit('input',val)
                }
            },
            value(val){
                this.model=val
            }

        },
        created() {
        },
        computed:{
        },
        props:{
            max:{
                type:Number

            },
            placeholder:{
                type:String,
                default: '请输入'
            },
            placeholderAlign:{
                type:String,
                default: 'right'
            },
            value: {
                type: String,
                default:''
            },
            isMust:{
                type:Boolean,
                default:false
            }
        },
        methods:{
        }

    }
</script>
<style>
    .total_container *{
        font-size: 12px!important;
    }
    .must{
        color:red;
    }
</style>