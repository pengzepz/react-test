import axios from 'axios';
// import { Toast } from 'vant'

// 统一请求路径前缀
let base = '/api';

// 接口环境地址
let API_ROOT = process.env.API_ROOT 

// 超时设定
axios.defaults.timeout = 15000;
// 跨域访问携带cookie
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    return config;
}, err => {
    // Toast('请求超时');    
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    const data = response.data;
    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
        case 210:
            // Toast(data.message);
            break;
        // 错误
        case 500:            
            // Toast("联系管理员");
            break;
        default:
            return data;
    }
    return data;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    // Toast('连接错误，请重试');
    return Promise.resolve(err);
});



const request = (method, url, params) => {
  return axios({
    method,
    url: `${API_ROOT}${base}${url}`,
    params
  });
}




// get 请求
export const getRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return request("get", url, params);
    // return axios({
    //     method: 'get',
    //     url: `${API_ROOT}${base}${url}`,
    //     params: params,
    //     headers: {
    //         'accessToken': accessToken
    //     }
    // });
};

// post请求
export const postRequest = (url, params) => {
    let accessToken = getStore("accessToken");
    return request("post", url, params);
    // return axios({
    //     method: 'post',
    //     url: `${API_ROOT}${base}${url}`,
    //     data: params,
    //     transformRequest: [function (data) {
    //         let ret = '';
    //         for (let it in data) {
    //             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    //         }
    //         ret = ret.substring(0, ret.length - 1);
    //         return ret;
    //     }],
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'accessToken': accessToken
    //     }
    // });
};

export const putRequest = (url, params) => {
    // let accessToken = getStore("accessToken");
    return axios({
        method: 'put',
        url: `${API_ROOT}${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken
        }
    });
};

export const deleteRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'delete',
        url: `${API_ROOT}${base}${url}`,
        params: params,
        headers: {
           'accessToken': accessToken
        }
    });
};

/**
 * 无需token验证的请求 避免旧token过期导致请求失败
 * @param {*} url 
 * @param {*} params 
 */
export const getRequestWithNoToken = (url, params) => {
    return axios({
        method: 'get',
        url: `${API_ROOT}${base}${url}`,
        params: params
    });
};

作者：一枚前端小姐姐
链接：https://juejin.cn/post/6876993324159500301
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。