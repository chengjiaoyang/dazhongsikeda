// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
// axios
import axios from 'axios';

Vue.use(ElementUI)
Vue.config.productionTip = false

// 将axios注入Vue原型上 每个实例化组件通过this.$axios访问
Vue.prototype.$axios = axios;


Vue.filter('changetostr', function(value) {
  return value.toString();
})

Vue.filter('changetrue', function(value) {
  if(value==1){//不免检
      value=false;
  }else{
    value=true;
  }//
  return value;
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
