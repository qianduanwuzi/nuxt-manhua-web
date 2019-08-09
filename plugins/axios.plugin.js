/*
  axios封装，process.client来区分服务端和B端
*/

import axios from "axios";
import whiteList from "./whiteList";
import Vue from 'vue'
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
const Cookie = process.client ? require('js-cookie') : undefined
export default ({ store, route, redirect }) => {
  console.log('17777----', store.state, process.client)
  axios.interceptors.request.use(
    config => {
      if (!whiteList.some(one => { config.url.indexOf(one) >= 0 })) { //没匹配到白名单
        // config.headers.Authorization = Store.get('token');
        Object.assign(config.headers, { token: process.client ? Cookie.get('_to') : store.state.token.token })
      }
      return config;
    },
    error => {
      if (process.client) Vue.prototype.$message.error('no net!')
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    res => {
      if (res.status == 200) {
        if (res.data.code != '200') {
          // console.log('32', res)
          // 令牌过期、失效
          if (res.data.code == '302') {
            // 需要判断客户端/服务端
            if (process.client) {
              Cookie.remove('_to');
              Vue.prototype.$message.error(res.data.msg);
              return redirect('/')
              Vue.prototype.$nuxt.$store.commit('login/ShowLogin')
            } else { }
            // console.log(Vue.prototype.$nuxt, Vue.prototype.$nuxt.$store)

            throw (res)
          } else {
            if (process.client) Vue.prototype.$message.error(res.data.msg)
            throw (res)
          }
        }

      } else {
      }
      return res;
    },
    err => {
      if (process.client) Vue.prototype.$message.error('connect out time!')
      return Promise.reject(err);
    }
  );
}

// export default axios;


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



