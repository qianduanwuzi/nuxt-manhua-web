/*
  作废
  陈楠
*/
// 浏览器端axios

import axios from "axios";
import whiteList from "./whiteList";
import Vue from 'vue'
import Cookies from 'js-cookie'
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;

axios.interceptors.request.use(
  config => {
    if (!whiteList.some(one =>{config.url.indexOf(one) >= 0})) { //没匹配到白名单
      // config.headers.Authorization = Store.get('token');
      Object.assign(config.headers, { token:  Cookies.get("_to")})
    }
    return config;
  },
  error => {
    Vue.prototype.$message.error('no net!')
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // if (!whiteList.some(one =>  res.config.url.indexOf(one) >=0 )) { //没匹配到白名单
      if(res.status == 200) {
        if(res.data.code != '200') {
          // 令牌过期、失效
          if(res.data.code == '302') {
            // localStorage.removeItem("token");
            // localStorage.removeItem("name");
            Cookies.remove('_to');
            Vue.prototype.$message.error(res.data.msg)
            // console.log(Vue.prototype.$nuxt, Vue.prototype.$nuxt.$store)
            Vue.prototype.$nuxt.$store.commit('login/ShowLogin')
            throw (res)
          }else {
            Vue.prototype.$message.error(res.data.msg)
            throw (res)
          }
        }

      } else {
      }
    // }
    return res;
  },
  err => {
    Vue.prototype.$message.error('connect out time!')
    return Promise.reject(err);
  }
);

export default axios;


// const http = {
//   post: function(action, params) {
//     return axios.post('/api'+action, params).then( res => res).catch(err => '')
//   },
//   get: function(action, params) {
//     console.log('get method has used --------------------')
//     return axios.get('https://mangadrawer.com/api'+action, { params: params })
//             .then( res => res.data)
//             .catch(err => {console.log('63', err); return ''})
//   },
//   put: function(action, params) {
//     return axios.put('/api'+action, params).then(res => res).catch(err => '')
//   },
//   delete: function(action, params) {
//     return axios.delete('/api'+action, { data: params }).then(res => res)
//     .catch(err => '')
//   },
// }

// export default http;



