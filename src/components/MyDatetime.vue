<template>
    <datetime :min-year="1900" v-model="model" @on-show="scroll"
              :placeholder="placeholder" :placeholder-align="placeholderAlign">
        <div slot="title" >
            <slot></slot>
            <span class="must" v-if="isMust">*</span>
        </div>
    </datetime>

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
                this.$emit('input',val)
            },
            value(val){
                this.model=val
            }

        },
        computed:{
        },
        props:{
            placeholder:{
                type:String,
                default: '请选择'
            },
            placeholderAlign:{
                type:String,
                default: 'right'
            },
            showName:{
                type:Boolean,
                default:true
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
            scroll(){
                document.body.scrollTop='1px'
                setTimeout(()=>{
                    document.body.scrollTop='2px'
                },200)
            }
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