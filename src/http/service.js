import axios from './axios'
import Util from '../assets/js/Util'

/**
 * 根据用户id获取进行中的预约
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentsOfUsingByUserId(params={}) {

    return axios.post('appointment/getListOfUsingByUserId', params)


}

/**
 * 根据用户id获取历史预约记录
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentHistoryByUserId(params={}) {

    return axios.post('appointment/getHistoryByUserId', params)


}

/**
 * 根据咨询师id获取历史预约记录
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentHistoryByTherapistId(params={}) {

    return axios.post('appointment/getHistoryByTherapistId', params)


}

/**
 * 根据预约id获取订单记录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getOrdersByAppointmentId(params={}) {

    return axios.post('order/getListByAppointmentId', params)


}

export function getAppointmentListByUserId(params={}) {

    return axios.post('appointment/getListByUserId', params)


}

export function cancelAppointment(params={}) {

    return axios.post('appointment/cancel', params)


}

/**
 * 根据工作室ID获取正在生效中的预约列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentListOfUsingByStationId(params) {

    return axios.post('appointment/getListOfUsingByStationId', params)


}

export function acceptAppointment(params) {

    return axios.post('appointment/accept', params)


}

/**
 * 咨询师完成预约
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function doneAppointment(params) {

    return axios.post('appointment/done', params)


}



export function pay(params) {

    return axios.post('order/pay', params)


}

export function offlinePay(params) {

    return axios.post('order/offlinePay', params)


}

/**
 * 多订单批量支付
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function batchPay(params) {

    return axios.post('order/batchPay', params)


}

/**
 * 多订单批量线下支付
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function offlineBatchPay(params) {

    return axios.post('order/offlineBatchPay', params)


}

export function cancelOrder(params) {

    return axios.post('order/cancel', params)


}

export function addComplaint(params) {

    return axios.post('complaint/add', params)


}

export function getComplaintByOrderId(params) {

    return axios.post('complaint/getByOrderId', params)


}

export function addFeedback(params) {

    return axios.post('feedback/add', params)


}

export function getFeedbackByOrderId(params) {

    return axios.post('feedback/getByOrderId', params)


}

export function getUserById(params) {

    return axios.post('user/getById', params)


}

export function updateUser(params) {

    return axios.post('user/update', params)


}


export function registerAndBind(params) {

    return axios.post('login/registerAndBind', params)


}


export function bindUser(params) {

    return axios.post('login/bind', params)


}


export function getEmergencyContackList() {

    return axios.post('emergencyContack/list', {})


}

export function deleteEmergencyContack(params) {

    return axios.post('emergencyContack/delete', params)


}

export function addEmergencyContack(params) {

    return axios.post('emergencyContack/add', params)


}

export function updateEmergencyContack(params) {

    return axios.post('emergencyContack/update', params)


}

export function updatePassword(params) {

    return axios.post('user/updatePassword', params)


}

/**
 * 获取所有已关联了工作室的咨询师列表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAllTherapist(params) {

    return axios.post('stationTherapistRelation/getAllTherapist', params)


}

export function getQualificationtypeList(params={}) {

    return axios.post('qualificationtype/list', params)


}

export function getSchooltypeList(params={}) {

    return axios.post('schooltype/list', params)


}

export function getMannertypeList(params={}) {

    return axios.post('mannertype/list', params)


}

export function getTherapistById(params) {

    return axios.post('therapist/getById', params)


}

export function getUseablePeriodSetByTherapistId(params) {

    return axios.post('therapistPeriodSet/getByTherapistId', params)


}

export function getAppointmentsOfUsingByTherapistId(params) {

    return axios.post('appointment/getListOfUsingByTherapistId', params)


}

export function addAppointment(params) {

    return axios.post('appointment/add', params)


}

export function getAppointmentDetail(params) {

    return axios.post('appointment/getDetail', params)


}

export function denyAppointment(params) {

    return axios.post('appointment/deny', params)


}




export function getOpenid(params) {

    return axios.post('wechatApi/getOpenid', params)


}

export function getUserByOpenid(params) {

    return axios.post('login/getUserByOpenid', params)


}

export function getRoomPeriodSetByStationId(params) {

    return axios.post('roomPeriodSet/getByStationId', params)


}

export function getRoomListByTherapistNoPage(params) {

    return axios.post('room/listByTherapistNoPage', params)


}

export function getDivisionByStationTherapistRelationId(params) {

    return axios.post('division/getByStationTherapistRelationId', params)


}


export function getDivisionByStationId(params) {

    return axios.post('division/getByStationId', params)


}

/**
 * 用户获取量表列表（预检表列表，包含基础量表的和分部自己的）
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getMeasureList(params) {

    return axios.post('questionMobile/getMeasureList', params)


}

/**
 * 保存用户回答的预检表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function saveAnswer(params) {

    return axios.post('questionMobile/saveAnswer', params)


}


/**
 * 获取用户在某个分部下回答的预检表
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAnswerMeasureList(params) {

    return axios.post('questionMobile/getAnswerMeasureList', params)


}















