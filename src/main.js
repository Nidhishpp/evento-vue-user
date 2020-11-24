/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import {
  Image,
  Carousel,
  CarouselItem,
  Drawer,
  Form,
  Input,
  InputNumber,
  FormItem,
  Select,
  Button,
  Option,
  OptionGroup,
  DatePicker,
  Table,
  TableColumn,
  Tag,
  Switch,
  MessageBox,
  Upload
} from 'element-ui';

import {
  store
} from './_store';

import Axios from 'axios';
import VueIziToast from "vue-izitoast";

import "izitoast/dist/css/iziToast.css";

Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token
}

Vue.use(NowUiKit);
Vue.use(Image);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Drawer);
Vue.use(Form);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Button);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Switch);
Vue.use(Upload);
Vue.use(VueIziToast, {
  position: 'topRight'
});

Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');