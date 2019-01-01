import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/Goods';
import ratings from './components/ratings/Ratings';
import seller from './components/seller/Seller';

import 'common/stylus/index.styl';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ],
  // mode: 'history',
  linkActiveClass: 'active'
});

var vRouter = new Vue({
  el: '#App',
  router,
  components: {App},
  template: '<App/>'
})
Vue.use(vRouter);
