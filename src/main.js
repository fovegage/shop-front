import Vue from 'vue'
import {
    Breadcrumb,
    BreadcrumbItem,
    Radio,
    Pagination,
    DatePicker,
    Input,
    Button,
    InputNumber,
    Message,
    RadioGroup
} from 'element-ui';
import App from './App.vue'
import router from './routers'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from "./env";
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from "vue-cookie"
import store from "./store/index"
// import '@/permission' // permission control  这个地方直接加载可以

// 使用面包屑
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Button)
Vue.use(VueLazyLoad)
// Vue.use(Message)
// 图片懒加载
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: '~@/static/imgs/loading-spokes.svg',
    attempt: 1
})
// 基础接口配置
Vue.config.productionTip = false
axios.defaults.baseURL = env.baseURL;
axios.defaults.timeout = 10000;

// request拦截器  不能在这里  这里就是全局了
axios.interceptors.request.use(config => {

    if (store.state.token) {
        config.headers['Authorization'] = "JWT " + store.state.token// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
})

// 接口错误拦截   response返回拦截
// 处理逻辑  200为成功 401为未鉴权 其他为不正常
axios.interceptors.response.use(function (response) {
    // console.log(response.data)
    let code = response.data.code;
    if (code === 200) {
        return response.data;
    } else if (code === 401) {
        window.location.href = '/login';
        Message.warning(response.data.message);
        return Promise.reject(response);
    } else {
        // http状态码为2xx 这里来进行爬虫限制
        // 这里返回服务器返回的信息
        // 搞一个错误页面
        // 统一报错信息
        Message.warning(response.data.message);
        return Promise.reject(response);
    }
}, (error) => {
    // 网络原因造成的报错
    // 这里是非 2xx 开头的拦截
    Message.error('网络超时，请稍后重试');
    return Promise.reject(error);
});
// 将axios挂载到vue的this.axios下
Vue.use(VueAxios, axios);

// cookie
Vue.use(VueCookie)
new Vue({
    store,
    el: '#app',
    router: router,
    render: h => h(App),
}).$mount('#app')
