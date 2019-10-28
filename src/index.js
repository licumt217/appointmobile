import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './routers'
import iView from 'view-design';
import axios from './http/axios'
require('./assets/js/StringPrototype')
import 'view-design/dist/styles/iview.css';

Vue.use(Vuex)
import store from './store'
Vue.use(iView)

Vue.prototype.http=axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
