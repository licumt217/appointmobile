<template>

    <!--0：问答，1：指导语，2：单选，3：矩阵-->
    <div>



        <div>
            <Row>
                <Col span="22" offset="1">
                    <Tabs :value="(curMeasure.id)+''" @on-click="changeTab" type="card">
                        <TabPane :label="(index+1)+''" :name="(measure.id)+''" v-for="(measure,index) in measureList" ></TabPane>
                    </Tabs>
                </Col>
            </Row>


            <Row>
                <Col span="20" offset="2">
                    <p style="text-indent: 2em;">
                        {{paper.startDesc}}
                    </p>
                </Col>
            </Row>

            <Row v-for="(item,index) in curMeasure.list">

                    <!--问答-->
                    <template v-if="item.type==='0'">
                        <Col span="20" offset="2" style="margin-bottom: 20px;">
                            <div class="questionName" >{{item.name}}</div>
                            <Input type="textarea" :disabled="curMeasure.finish===2" :rows="3" v-model="item.value" placeholder="请输入您的答案"></Input>
                        </Col>
                    </template>

                    <!--指导语-->
                    <template v-if="item.type==='1'">
                        <Col span="20" offset="2" style="margin-bottom: 20px;">
                            <div  class="questionName" >{{item.name}}</div>
                        </Col>
                    </template>

                    <!--条目-->
                    <template v-if="item.type==='2'">
                        <Col span="20" offset="2" style="margin-bottom: 20px;">
                            <div  class="questionName">{{(item.questionIndex)+'、'+item.name}}</div>
                            <RadioGroup v-model="item.value" vertical>
                                <Radio  :disabled="curMeasure.finish===2" :label="option.value" v-for="option in item.answer">{{option.key}}</Radio>
                            </RadioGroup>
                        </Col>
                    </template>

                    <!--矩阵-->
                    <template v-if="item.type==='3'">
                        <Col span="20" offset="2" style="margin-bottom: 20px;">
                            <div  class="questionName">{{(item.questionIndex)+'、'+item.name}}</div>
                            <div v-for="(child,childIndex) in item.children" style="padding-left: 2em;margin-bottom: 1em;">
                                <template v-if="child.isReverse===1">
                                    <p >{{((childIndex+1))+'、'+child.name}}</p>
                                    <RadioGroup v-model="child.value" vertical>
                                        <Radio  :disabled="curMeasure.finish===2" :label="child.answer[child.answer.length-1-i].value" v-for="(option,i) in child.answer">{{option.key}}</Radio>
                                    </RadioGroup>
                                </template>
                                <template v-else>
                                    <p >{{((childIndex+1))+'、'+child.name}}</p>
                                    <RadioGroup v-model="child.value" vertical>
                                        <Radio  :disabled="curMeasure.finish===2" :label="option.value" v-for="(option,i) in child.answer">{{option.key}}</Radio>
                                    </RadioGroup>
                                </template>
                            </div>

                        </Col>
                    </template>

            </Row>
            <Row>
                <Col span="20" offset="2">
                    <p style="text-indent: 2em;">
                        {{paper.endDesc}}
                    </p>
                </Col>

            </Row>
            <Row style="margin-bottom: 1em;" v-if="curMeasure.finish!==2">
                <Col span="4" offset="5">
                    <Button type="success" @click="save">保存</Button>
                </Col>
                <Col span="4" offset="6">
                    <Button type="primary" @click="commit">提交</Button>
                </Col>
            </Row>
        </div>


    </div>

</template>

<script>

    import {Util} from '../../assets/js/Util'

    import {Calculation} from '../../assets/js/calculation'

    export default {
        data() {
            return {
                isShowTipModal:false,
                paperId:this.$route.query.paperId,

                paper:{},
                measureList:[],
                curMeasure:{},
                intermediateTableId:'',
                waitMeasure: [],
                relation:{},
                ruleKey:{},
                tip:''

            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {

            this.getMeasureList()
        },
        methods: {
            init(){
                this.getMeasureList()
            },
            changeTab(measureId){

                for(let i=0;i<this.measureList.length;i++){
                    if(this.measureList[i].id===Number(measureId)){
                        this.curMeasure=this.measureList[i]
                        break;
                    }
                }
            },

            isValid(){

              let list=this.curMeasure.list;

              for(let i=0;i<list.length;i++){
                  let item=list[i]
                  if(item.type!=='1'){
                      if(item.type==='0' || item.type==='2'){
                          if((item.must==='0' || !item.must) && (!item.value && item.value!==0)){
                              return false;
                              break;
                          }
                      }else{//矩阵
                          if(item.must==='0'  || !item.must){
                              for(let j=0;j<item.children.length;j++){
                                  if((!item.children[j].value && item.children[j].value!==0)){
                                      return false;
                                      break;
                                  }
                              }
                          }
                      }

                  }
              }

              return true;



            },
            commit(){
                if(!this.isValid()){
                    this.$Message.warning("请填写完毕所有问题再提交！")
                    return;
                }

                this.$Modal.confirm({
                    title: '提交后无法修改，请确认答题后提交!',
                    content: '',
                    onOk: () => {

                        let nextMeasureId=Calculation.getQuestionScore(this.curMeasure,this.relation,this.ruleKey,this.waitMeasure)
                        this.curMeasure.finish=2;
                        let data={
                            intermediateTableId:this.intermediateTableId,
                            waitMeasure:JSON.stringify(this.waitMeasure),
                            answerList:JSON.stringify(this.curMeasure),
                            measureId:this.curMeasure.id,
                            manageId:this.paperId,
                            nextMeasureId:nextMeasureId
                        }


                        this.http.post('appointmobile/saveFinshAnswer', data).then(data => {

                            if(!nextMeasureId){

                                Promise.all([this.http.post('appointmobile/generateReport', {
                                    manageId:this.paperId,
                                    intermediateTableId:this.intermediateTableId
                                }),this.http.post('appointmobile/detailResult', {
                                    manageId:this.paperId,
                                    intermediateTableId:this.intermediateTableId
                                })]).then(data=>{
                                    this.$Message.success({
                                        content:`问卷已答完，请在报告菜单中查看结果！`,
                                        duration:3
                                    })

                                    this.init()
                                }).catch(err=>{
                                    this.$Message.warning(err)
                                })
                            }else{
                                this.$Message.success("提交成功！")
                                this.init()
                            }


                        }).catch(err=>{
                            this.$Message.warning(err)
                        })

                    },
                    onCancel: () => {
                    }
                });






            },
            save(){

                this.curMeasure.finish=1;
                let data={
                    intermediateTableId:this.intermediateTableId,
                    waitMeasure:JSON.stringify(this.waitMeasure),
                    answerList:JSON.stringify(this.curMeasure),
                    measureId:this.curMeasure.id,
                }

                this.http.post('appointmobile/saveAnswer', data).then(data => {
                    this.$Message.success("保存成功！")
                    this.init()

                }).catch(err=>{
                    this.$Message.warning(err)
                })
            },
            getMeasureList(){
                this.http.post('appointmobile/getManage', {
                    manageId:this.paperId
                }).then(data => {

                    this.paper=data.manage;

                    this.waitMeasure=data.waitMeasure
                    this.ruleKey=data.ruleKey
                    this.relation=data.relation

                    this.intermediateTableId=data.intermediateTableId

                    if(data.data.length>0){
                        data=data.data



                        for(let m=0;m<data.length;m++){
                            for(let i=0;i<data[m].list.length;i++){


                                if(typeof data[m].list[i].answer==='string'){
                                    data[m].list[i].answer=JSON.parse(data[m].list[i].answer)
                                }

                                if(data[m].list[i].children.length>0){
                                    for(let j=0;j<data[m].list[i].children.length;j++){
                                        if(typeof data[m].list[i].children[j].answer==='string'){
                                            data[m].list[i].children[j].answer=JSON.parse(data[m].list[i].children[j].answer)
                                        }

                                    }
                                }
                            }
                        }

                        this.measureList=data;
                        this.curMeasure=this.measureList[this.measureList.length-1]


                    }


                }).catch(err=>{
                    this.$Message.warning(err)
                })
            },


        }
    }
</script>

<style scoped>

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .questionName{
        font-size: 12px;
        margin-bottom: 2px;
    }



</style>
