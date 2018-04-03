// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import Vuex from 'vuex'
import store from './vuex/store'
import Lockr from 'lockr'
import layer from 'vue-layer'

Vue.use(Vuex);
Vue.use(iView);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://staticfiles.xiaochengyun.cn/adminapiC';

Vue.prototype.$ajax = axios;
Vue.prototype.Lockr = Lockr;
Vue.prototype.$layer = layer(Vue);
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(config.method=='post'){
    config.params = {
      ...config.params,
      shopId: Lockr.get("shopId"),
      userId: Lockr.get("userId"),
      shopType: Lockr.get("shopType"),
    }
  }else if(config.method=='get'){
    config.params = {
      shopId: Lockr.get("shopId"),
      userId: Lockr.get("userId"),
      shopType: Lockr.get("shopType"),
      ...config.params
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  console.log(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
