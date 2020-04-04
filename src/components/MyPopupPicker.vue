<template>
    <popup-picker :data="data2"  :placeholder='placeholder' :placeholder-align="placeholderAlign" @on-show="scroll"
                  v-model="model"
                   :show-name="showName" style="color:red;">
            <div slot="title" >
                <slot></slot>
                <span class="must" v-if="isMust">*</span>
            </div>

    </popup-picker>
</template>

<script>
    export default {
        data(){
            return {
                model:[]
            }
        },
        watch: {
            model (val) {
                if(Array.isArray(val) && val.length>0){
                    this.$emit('input',val[0])
                }else if(val){
                    alert(1)
                }
            },
            value(val){
                this.model=[val]
            }

        },
        computed:{
            data2(){
                return [this.data]
            }
        },
        props:{
            data:{
                type:Array,
                default () {
                    return [{}]
                }
            },
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