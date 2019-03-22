import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWrench as fasWrench } from '@fortawesome/free-solid-svg-icons/faWrench'
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons/faCircle'
import { faHome as fasHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'

library.add(fasWrench, fasCircle, farCircle, fasHome)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: {
    ipfs: null
  }
}).$mount('#app')
