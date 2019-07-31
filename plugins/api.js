import api from "./axios";
import Vue from 'vue'

const http = {
  post: function(action, params) {
    return api.post('/api'+action, params).then( res => res).catch(err => '')
  },
  get: function(action, params) {
    return api.get('/api'+action, { params: params })
            .then( res => res.data)
            .catch(err => '')
  },
  put: function(action, params) {
    return api.put('/api'+action, params).then(res => res).catch(err => '')
  },
  delete: function(action, params) {
    return api.delete('/api'+action, { data: params }).then(res => res).catch(err => '')
  },
}

Vue.prototype.$api = http

// export default http


