import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWrench, faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'

library.add(faWrench, fasCircle, farCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: {
    ipfs: null
  }
}).$mount('#app')
