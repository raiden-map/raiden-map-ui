import Vue from 'vue'
import Router from 'vue-router'
import environment from './environment.js'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/raiden/Dashboard')

const RaidenMap = () => import('@/views/RaidenMap')
const RaidenMapLocation = () => import('@/views/RaidenMapLocation')

const cryptoDetails = () => import('@/views/raiden/cryptoDetails')


Vue.prototype.$eventHub = new Vue();
Vue.prototype.$apiUrl = environment.apiProd

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'cryptoDetails',
          name: 'Crypto Details',
          component: cryptoDetails
        },
        {
          path: 'raiden-map',
          name: 'RaidenMap',
          component: RaidenMap
        },
        {
          path: 'raiden-map-location',
          name: 'RaidenMap Location',
          component: RaidenMapLocation
        },
      ]
    },
  ]
})
