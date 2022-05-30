import Vue from 'vue';
import store from './store';
import router from './router';
// 组件
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 权限
import './permission';
// 样式
import './assets/styles/index.scss';
import 'normalize.css/normalize.css';
// 全局对象/函数
import * as echarts from 'echarts';
import {
  successNotify,
  errorNotify,
  warningConfirm,
  successMessage,
  errorMessage
} from '@/utils/tips';

Vue.use(ElementUI);

// 全局方法
Vue.prototype.$echarts = echarts;
Vue.prototype.$successNotify = successNotify;
Vue.prototype.$errorNotify = errorNotify;
Vue.prototype.$warningConfirm = warningConfirm;
Vue.prototype.$successMessage = successMessage;
Vue.prototype.$errorMessage = errorMessage;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
});
