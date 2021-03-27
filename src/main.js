import Vue from 'vue'
import App from './App.vue'
import vuex from "./vuex"

new Vue({
  store: vuex,
  render: h => h(App),
}).$mount('#app')

