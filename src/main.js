import Vue from 'vue'
import App from './App.vue'
import {store} from './store/index'
import router from './router/index';
import dotenv from 'dotenv';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './style.css';

dotenv.config();
Vue.use(VueSweetalert2);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
