import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false
//export const api_url = "https://stable-rest-api.herokuapp.com/"
Vue.prototype.$API_URL = "https://stable-rest-api.herokuapp.com/"
new Vue({
  router,
  vuetify,
  store,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
