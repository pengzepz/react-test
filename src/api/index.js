import { getRequest, postRequest } from './axios';

// 接口名称
export const _getClolum = (params) => {
    return getRequest('/get/colum', params)
}
// 接口名称
export const _getSave = (params) => {
    return postRequest('/vo/save', params)
}