import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApp } from './common/Observer';

Vue.config.productionTip = false

createdVueInstance();

function createdVueInstance(){
const newapp = new Vue({
  router,
  render: h => h(App)
})
registerApp(newapp);
newapp.$mount('#app')
}