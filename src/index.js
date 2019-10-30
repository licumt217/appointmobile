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
import VConsole from 'vconsole';

if(process.env.NODE_ENV!=='prod'){
  new VConsole();
}
Vue.prototype.http=axios;

Vue.config.productionTip = false

const app=new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

export default app
