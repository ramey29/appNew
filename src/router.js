import Vue from 'vue';
import Router from 'vue-router';
// import Success from './components/conversion/Success';
import ConversionHistory from './components/ConversionHistory';
// import GlobalStorage from './common/GlobalStorage';
// import * as Constants from './common/Constants';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      components: {"conversion-history": ConversionHistory},
      beforeEnter: (to, from, next) => { },
    },
    
  ]
})
