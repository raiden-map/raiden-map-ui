// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router/index'
import Cryptoicon from 'vue-cryptoicon'
import icon from 'vue-cryptoicon/src/icons'
import Vuex from 'vuex'

Vue.use(Vuex)

// todo
// cssVars()

Vue.use(BootstrapVue)
Cryptoicon.add(icon)
Vue.use(Cryptoicon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
