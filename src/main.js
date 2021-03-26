import Vue from 'vue'



import App from './App01.vue'


import vuex from "./vuex"

new Vue({
  store: vuex,
  render: h => h(App),
}).$mount('#app')

