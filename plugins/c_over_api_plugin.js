/*
  作废
  陈楠
*/
// 浏览器端axios再封装
import Vue from "vue";
import axios from "./c_axios_plugin"; // 引入封装了拦截器的axios

const baseUrl = '/api'
const http = {
  post: function(action, params) {
    return axios.post(baseUrl+action, params).then( res => res).catch(err => '')
  },
  get: function(action, params) {
    console.log('get method has used --------------------',axios)
    // https://mangadrawer.com
    return axios.get(baseUrl+action, { params: params })
            .then( res => res.data)
            .catch(err => {console.log('63', err); return ''})
  },
  put: function(action, params) {
    return axios.put(baseUrl+action, params).then(res => res).catch(err => '')
  },
  delete: function(action, params) {
    return axios.delete(baseUrl+action, { data: params }).then(res => res)
    .catch(err => '')
  },
}

const install = function (VueClass, opts = {}) {

    // http method
    VueClass.http = http;
    VueClass.prototype.$http = http;
};
Vue.use(install);// 在vue 中，使用该插件
