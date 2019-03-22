import Vue from 'vue'
import Router from 'vue-router'
import Lobby from '@/views/Lobby.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: Lobby
    }
  ]
})
