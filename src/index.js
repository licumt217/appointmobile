import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './routers'
import iView from 'view-design';
import axios from './http/axios'
require('./assets/js/StringPrototype')


import  { ToastPlugin,Group, XInput, XButton, Badge, Confirm,Selector,Datetime,
  PopupPicker,XTable,Actionsheet,ConfirmPlugin,XHeader,Flexbox, FlexboxItem,LoadingPlugin,XAddress,
  Step, StepItem,Divider,Popup,Loading,XTextarea,XNumber} from 'vux'

Vue.use(ToastPlugin)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('badge', Badge)
Vue.component('confirm', Confirm)
Vue.component('selector', Selector)
Vue.component('datetime', Datetime)
Vue.component('popup-picker', PopupPicker)
Vue.component('x-table', XTable)
Vue.component('actionsheet', Actionsheet)
// Vue.component('popup-radio', PopupRadio)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-address', XAddress)
Vue.component('step', Step)
Vue.component('step-item', StepItem)
Vue.component('divider', Divider)
Vue.component('popup', Popup)
Vue.component('loading', Loading)
Vue.component('x-textarea', XTextarea)
Vue.component('x-number', XNumber)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

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
