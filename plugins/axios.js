import axios from "axios";
import whiteList from "./whiteList";
import Vue from 'vue'
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;

axios.interceptors.request.use(
  config => {
    if (!whiteList.some(one =>{config.url.indexOf(one) >= 0})) { //没匹配到白名单
      // config.headers.Authorization = Store.get('token');
      Object.assign(config.headers, { token:  localStorage.getItem("token")})
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
            localStorage.removeItem("token");
            localStorage.removeItem("name");
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


