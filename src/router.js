import Vue from 'vue'
import Router from 'vue-router'
import Lobby from '@/views/Lobby'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/host',
      name: 'host',
      component: () => import(/* webpackChunkName: "room" */ '@/views/Host.vue')
    },
    {
      path: '/:host/:id',
      name: 'room',
      component: () => import(/* webpackChunkName: "room" */ '@/views/Room.vue')
    }
  ]
})

export default router
