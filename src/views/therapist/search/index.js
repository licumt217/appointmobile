import React, {Component} from 'react';

import {Picker, List, Flex, Button, Card,WingBlank,WhiteSpace} from "antd-mobile";
import Util from "../../../assets/js/Util";

import {getQualificationtypeList, getMannertypeList, getSchooltypeList, getUserList} from '../../../http/service'

import Role from "../../../assets/js/Role";
import {SEX} from "../../../assets/js/constants/constant"
import './index.less'

class Index extends Component {


    constructor(props) {
        super(props);


        this.state = {
            isEmergency: false,
            listData: {},
            therapistList: [],
            form: {
                zone: '',
                gender: '',
                qualification_type_id: '',
                school_type_id: '',
                manner_type_id: '',
            },
            qualificationOptions: [],
            schoolTypeOptions: [],
            mannerTypeOptions: [],
            provinces: [
                {
                    label: '北京市',
                    value: '北京市',
                    children: [
                        {
                            label: '昌平区',
                            value: '昌平区'
                        },
                        {
                            label: '大兴区',
                            value: '大兴区'
                        },
                        {
                            label: '海淀区',
                            value: '海淀区'
                        },
                    ]
                },
                {
                    label: '河北省',
                    value: '河北省',
                    children: [
                        {
                            label: '保定市',
                            value: '保定市'
                        },
                        {
                            label: '张家口市',
                            value: '张家口市'
                        }
                    ]
                }
            ],
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

        let pageSize = Util.pageSize

        let whereObj = {
            role: Role.therapist,
            page,
            pageSize: 1,
        }

        Object.assign(whereObj, this.state.form)


        getUserList(whereObj).then((data) => {

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

        debugger
        this.props.history.push({
            pathname: '/therapist/detail',
            state:{
                therapist_id: item.user_id
            }
        })

    }

    next=(item)=> {


        //TODO 紧急咨询时填原因

        //TODO 判断是否平台黑名单或所选咨询师的黑名单，是的话无法继续预约。分两次判断，当前所选咨询师黑名单的话可以切换咨询师

        //TODO 判断是否首次预约，首次的话需要同意隐私条款。隐私条款每条都需要同意吗？类似复选框都选中？还是确定一条之后依次出现下一条。这样是否太变态了？

        if (this.isEmergency) {

            // this.$refs.emergencyConsult.show()

        } else {
            this.props.history.push({
                pathname: '/appoint/selectDate',
                state:{
                    therapist_id: item.user_id,
                    consult_type_id: item.consult_type_id,
                    manner_type_id: item.manner_type_id
                }
            })
        }

    }


    //紧急咨询回调
    consult=()=> {
        //TODO 后续流程呢？
    }


    handleFormChange = (type, value) => {
        let form = this.state.form;
        if (value.length > 0) {
            form[type] = value[0];
        }


        this.setState({
            form,


        })
    }


    render() {


        return (
            <div className={'wrapper'}>
                <Picker extra="请选择"
                        data={this.state.provinces}
                        title="区域"
                        value={this.state.form.zone}
                        onChange={v => this.setState({zone: v})}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
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
                                                        <List.Item>流派：{this.schoolTypeObj[item.school_type_id] ? this.schoolTypeObj[item.school_type_id].school_type_name : ''}</List.Item>
                                                        <List.Item>资历：{this.qualificationTypeObj[item.qualification_type_id] ? this.qualificationTypeObj[item.qualification_type_id].qualification_type_name : ''}</List.Item>
                                                        <List.Item>咨询方式：{this.mannerTypeObj[item.manner_type_id] ? this.mannerTypeObj[item.manner_type_id].manner_type_name : ''}</List.Item>
                                                    </List>
                                                        <Flex>
                                                            <Flex.Item>
                                                                <Button type={"ghost"} size={"small"} onClick={this.next.bind(this, item)}>选择此咨询师</Button>
                                                            </Flex.Item>
                                                            <Flex.Item>
                                                                <Button type={"primary"}  size={"small"} onClick={this.detail.bind(this, item)}>查看详情</Button>
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
                                <WhiteSpace/>
                                <p className={'center'}>
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