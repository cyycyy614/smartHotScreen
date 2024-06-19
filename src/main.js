import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueJsonp } from 'vue-jsonp'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import 'animate.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueJsonp)
Vue.prototype.$echarts = echarts
Vue.use(ElementUI, {
  size: 'mini', // set element-ui default size(这里原来是store.getters.size，现在写死为mini)
})

// 引入百度地图（不用再到html中导入）

import VueBMap from 'vue-bmap-gl'
import 'vue-bmap-gl/dist/style.css'
Vue.use(VueBMap)
VueBMap.initBMapApiLoader({
  ak: 'nA7ar55XsYIjFxjnxpImfkI5upaRvKKn',
  v: '1.0',
})

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
