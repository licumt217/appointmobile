import axios from './axios'
import Util from '../assets/js/Util'

/**
 * 根据用户id获取进行中的预约
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getAppointmentsOfUsingByUserId() {

    return axios.post('appointment/getListOfUsingByUserId', {})


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

export function getAppointDetail(params) {

    return axios.post('order/getAppointDetail', params)


}

export function pay(params) {

    return axios.post('order/pay', params)


}

export function cancelOrder(params) {

    return axios.post('order/cancelOrder', params)


}

export function addComplaint(params) {

    return axios.post('complaint/add', params)


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

export function getUserList(params) {

    return axios.post('user/list', params)


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

export function getUseablePeriodSet(params) {

    return axios.post('therapist/getUseablePeriodSet', params)


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

export function confirmOrder(params) {

    return axios.post('order/done', params)


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

export function getAppointmentListOfUsingByStationId(params) {

    return axios.post('appointment/getListOfUsingByStationId', params)


}

export function acceptAppointment(params) {

    return axios.post('appointment/accept', params)


}













