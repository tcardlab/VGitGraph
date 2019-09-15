import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _27e8face = () => interopDefault(import('../pages/testing.vue' /* webpackChunkName: "pages/testing" */))
const _16f84a83 = () => interopDefault(import('../pages/v2.vue' /* webpackChunkName: "pages/v2" */))
const _3655deca = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/testing",
      component: _27e8face,
      name: "testing"
    }, {
      path: "/v2",
      component: _16f84a83,
      name: "v2"
    }, {
      path: "/",
      component: _3655deca,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
