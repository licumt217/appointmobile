import React, {Component} from 'react';

import {Picker, List, Flex, Button, Card,WingBlank,WhiteSpace} from "antd-mobile";
import Util from "../../../assets/js/Util";

import {
    getQualificationtypeList,
    getMannertypeList,
    getSchooltypeList,
    getAllTherapist,
    getDivisionByStationTherapistRelationId,
    getMeasureList,
    isAgree
} from '../../../http/service'

import ROLE from "../../../assets/js/constants/ROLE";
import {SEX} from "../../../assets/js/constants/constant"
import {pczOptions} from "../../../assets/js/pcz";
import './index.less'
import ETHICSNOTICE_SHOW_MANNER from "../../../assets/js/constants/ETHICSNOTICE_SHOW_MANNER";
import ETHICSNOTICE_STATE from "../../../assets/js/constants/ETHICSNOTICE_STATE";
import FUNCTION_LEVEL from "../../../assets/js/constants/FUNCTION_LEVEL";
import DateUtil from "../../../assets/js/DateUtil";

class Index extends Component {


    constructor(props) {
        super(props);


        this.state = {
            isEmergency: false,
            listData: {},
            therapistList: [],
            form: {
                area: '',
                gender: '',
                qualification_type_id: '',
                school_type_id: '',
                manner_type_id: '',
            },
            qualificationOptions: [],
            schoolTypeOptions: [],
            mannerTypeOptions: [],
            pczOptions
        }
    }

    componentDidMount() {
        this.getBaseInfo()
    }

    getBaseInfo = () => {


        Promise.all([

            getQualificationtypeList(),
            getSchooltypeList(),
            getMannertypeList(),
        ]).then((data) => {
            this.qualificationTypeObj = Util.array2Object(data[0], 'qualification_type_id')
            this.schoolTypeObj = Util.array2Object(data[1], 'school_type_id')
            this.mannerTypeObj = Util.array2Object(data[2], 'manner_type_id')

            this.setState({
                qualificationOptions: Util.getPopupPickerOptions(data[0], 'qualification_type_id', 'qualification_type_name'),
                schoolTypeOptions: Util.getPopupPickerOptions(data[1], 'school_type_id', 'school_type_name'),
                mannerTypeOptions: Util.getPopupPickerOptions(data[2], 'manner_type_id', 'manner_type_name')
            })


        }).catch(err => {
            Util.fail(err)
        });
    }

    getList = (page, isLoadmore) => {


        page = page || 1;

        let whereObj = {
            role: ROLE.therapist,
            page,
            pageSize: Util.pageSize
        }

        Object.assign(whereObj, this.state.form)


        getAllTherapist(whereObj).then((data) => {

            this.setState({
                listData: data
            })

            if (isLoadmore) {
                this.setState({
                    therapistList: this.state.therapistList.concat(data.data)
                })
            } else {
                this.setState({
                    therapistList: data.data
                })
            }

        }).catch(err => {
            Util.fail(err)
        })
    }

    loadMore=()=> {
        this.getList(this.state.listData.currentPage + 1, true);
    }

    detail=(item)=> {

        this.props.history.push({
            pathname: '/therapist/cv',
            state:{
                therapist_id: item.user_id
            }
        })

    }

    next=(item)=> {
        //首先判断所选咨询师所在的分部的权限是否能在线预约，能的话下一步，不能的话提示用户

        getDivisionByStationTherapistRelationId({
            station_therapist_relation_id:item.station_therapist_relation_id
        }).then(data=>{
            if(data.function_level===FUNCTION_LEVEL.BASE){
                Util.notice({
                    title:'通知',
                    msg:'该咨询师所在的分部暂未开通在线预约功能，请您通过该咨询师的联系方式进行线下联系！'
                })
            }else{
                //TODO 紧急咨询时填原因


                //TODO 判断是否首次预约，首次的话需要同意隐私条款。隐私条款每条都需要同意吗？类似复选框都选中？还是确定一条之后依次出现下一条。这样是否太变态了？

                if (this.isEmergency) {

                    // this.$refs.emergencyConsult.show()

                } else {
                    //首先判断是否同意用户协议

                    isAgree().then(data=>{

                        if(data.agree){
                            //判断是否回答过该咨询师对应分部的预检表，回答过的话直接到选日期页面；否则回答预检表
                            getMeasureList({
                                organization_id:item.division_id
                            }).then(data=>{

                                if(data.status===1){//已回答过
                                    this.props.history.push({
                                        pathname: '/appoint/selectDate',
                                        state:{
                                            therapist_id: item.user_id,
                                            station_id: item.station_id,
                                        }
                                    })
                                }else{
                                    this.props.history.push({
                                        pathname: '/appoint/preCheck',
                                        state:{
                                            division_id:item.division_id
                                        }
                                    })
                                }
                            }).catch(err => {
                                Util.fail(err)
                            });
                        }else{

                            this.props.history.push({
                                pathname: '/user/agreement',
                                state:{
                                    division_id:item.division_id,
                                    therapist_id:item.user_id,
                                    station_id:item.station_id,
                                }
                            })
                        }
                    }).catch(err => {
                        Util.fail(err)
                    });
                }
            }
        }).catch(err => {
            Util.fail(err)
        });



    }


    //紧急咨询回调
    consult=()=> {
        //TODO 后续流程呢？
    }

    /**
     * 是否显示伦理公告
     * */
    isShowEthicsnotice=(item)=>{
        if(item.state===ETHICSNOTICE_STATE.ON){
            if(item.show_manner===ETHICSNOTICE_SHOW_MANNER.FOREVER){//永久
                return true;
            }else if(item.show_manner===ETHICSNOTICE_SHOW_MANNER.PERIOD){//一段时间
                if(DateUtil.isBefore(new Date(),new Date(item.end_date))){
                    return true;
                }
            }
        }

        return false;
    }


    handleFormChange = (type, value) => {

        let form = this.state.form;
        if (value.length > 0) {
            if(type==='area'){
                form[type] = value
            }else{form[type] = value[0];

            }

        }


        this.setState({
            form,


        })
    }


    render() {


        return (
            <div className={'wrapper'}>
                <Picker extra="请选择"
                        data={this.state.pczOptions}
                        title="区域"
                        value={this.state.form.area}
                        // onChange={v => console.log(v)}
                        onOk={this.handleFormChange.bind(this, 'area')}
                >
                    <List.Item arrow="horizontal" key={1}>咨询师所在区域</List.Item>
                </Picker>

                <Flex>
                    <Flex.Item>
                        <Picker data={Util.genderOptions} cols={1}
                                extra="请选择"
                                value={[this.state.form.gender]}
                                onOk={this.handleFormChange.bind(this, 'gender')}
                        >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>


                    </Flex.Item>
                    <Flex.Item>
                        <Picker data={this.state.qualificationOptions} cols={1}
                                extra="请选择"
                                value={[this.state.form.qualification_type_id]}
                                onOk={this.handleFormChange.bind(this, 'qualification_type_id')}
                        >
                            <List.Item arrow="horizontal">资质</List.Item>
                        </Picker>
                    </Flex.Item>
                </Flex>

                <Flex>
                    <Flex.Item>
                        <Picker data={this.state.schoolTypeOptions} cols={1}
                                extra="请选择"
                                value={[this.state.form.school_type_id]}
                                onOk={this.handleFormChange.bind(this, 'school_type_id')}
                        >
                            <List.Item arrow="horizontal">学派</List.Item>
                        </Picker>


                    </Flex.Item>
                    <Flex.Item>
                        <Picker data={this.state.mannerTypeOptions} cols={1}
                                extra="请选择"
                                value={[this.state.form.manner_type_id]}
                                onOk={this.handleFormChange.bind(this, 'manner_type_id')}
                        >
                            <List.Item arrow="horizontal">咨询方式</List.Item>
                        </Picker>
                    </Flex.Item>
                </Flex>

                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type={"ghost"} size={"small"} onClick={this.getList.bind(this, 1, false)}>查询</Button>
                </WingBlank>

                <section>
                    {
                        this.state.therapistList.length>0?
                            this.state.therapistList.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <WhiteSpace/>
                                        <WingBlank>
                                            <Card >
                                                <Card.Body>
                                                    <List>
                                                        <List.Item>姓名：{item.name}</List.Item>
                                                        <List.Item>性别：{SEX[item.gender]}</List.Item>
                                                        <List.Item>工作室：{item.station_name}</List.Item>
                                                        <List.Item>流派：{this.schoolTypeObj[item.school_type_id] ? this.schoolTypeObj[item.school_type_id].school_type_name : ''}</List.Item>
                                                        <List.Item>资历：{this.qualificationTypeObj[item.qualification_type_id] ? this.qualificationTypeObj[item.qualification_type_id].qualification_type_name : ''}</List.Item>
                                                        <List.Item>咨询方式：{this.mannerTypeObj[item.manner_type_id] ? this.mannerTypeObj[item.manner_type_id].manner_type_name : ''}</List.Item>
                                                        <List.Item>费用：{item.fee}</List.Item>
                                                        {

                                                            this.isShowEthicsnotice(item)?
                                                                <List.Item >
                                                                    <span style={{color:'red'}}>
                                                                        伦理公告：{item.content}
                                                                    </span>
                                                                </List.Item>
                                                                :null
                                                        }
                                                    </List>
                                                        <Flex>
                                                            <Flex.Item>
                                                                <Button type={"ghost"} size={"small"} onClick={this.next.bind(this, item)}>选择此咨询师</Button>
                                                            </Flex.Item>
                                                            <Flex.Item>
                                                                <Button type={"primary"}  size={"small"} onClick={this.detail.bind(this, item)}>查看简历</Button>
                                                            </Flex.Item>
                                                        </Flex>
                                                </Card.Body>
                                            </Card>
                                        </WingBlank>
                                    </React.Fragment>

                                )
                            })
                            :
                            <React.Fragment>
                                <WhiteSpace/>
                                <p className={'center'}>未找到符合条件的咨询师</p>
                            </React.Fragment>
                    }

                    {
                        this.state.listData.totalPages > this.state.listData.currentPage ?
                            <React.Fragment>
                                <p className={'center'} style={{margin:'1.5em'}}>
                                    <span onClick={this.loadMore}>加载更多</span>
                                </p>
                            </React.Fragment>
                            : null
                    }


                </section>


            </div>
        );
    }
}

export default Index;
