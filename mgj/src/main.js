import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:3000'
}))

// 引入全局样式
import './assets/css/global.css'
//引入字体图标库
import './assets/font/font_xn7gg6ug1r/iconfont.css'
//引入minUi npm i mint-ui -S
import Mint from 'mint-ui'
Vue.use(Mint)
//封装弹出
//vue的高级应用
import alert from './components/common/alert/alert.js'
Vue.use(alert)
/*** 引入qs vue中没有直接的库对数据进行序列化处理 ***/
import qs from 'qs'
Vue.prototype.$qs=qs    //将qs挂载到原型

/***************  下拉加载插件(重要)  ************************/
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

//配置axios请求
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 请求响应拦截
axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('my-token')
  if (token) {
    config.headers['authorization'] = 'bearer ' + token
  }
  return config
}, err => {
  console.log(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err)
})

Vue.prototype.$http = axios

//vue父子组件中传参
Vue.prototype.$bus=new Vue()

//移动端rem解决适配（重要）
//npm i lib-flexible –-save
//npm i --save postcss-plugin-px2rem 
import "lib-flexible"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
