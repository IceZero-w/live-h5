import Vue from 'vue'
import 'normalize.css'
import router from '@/router/index'
import App from './App.vue'
console.log(router, '---router')
Vue.config.productionTip = false

// const { hacks } = require('viewport-units-buggyfill');
// require('viewport-units-buggyfill').init({
//   hacks: hacks
// });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
