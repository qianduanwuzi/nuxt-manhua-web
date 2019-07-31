import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
// Antd.message.config({top: '500px'})
export default () => {
  Vue.use(Antd)
  Vue.prototype.$message.config({ top: '45%' })
}
