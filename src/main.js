import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueWow from 'vue-wow'

import ElementUI from 'element-ui';
import VideoBg from 'vue-videobg'

// ToDO check what is it
import 'element-ui/lib/theme-chalk/index.css';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
Vue.component('video-bg', VideoBg);

Vue.use(ElementUI);

Vue.use(VueWow);

Vue.config.productionTip = false;
Vue.config.devtools = true

Vue.directive('img-lazy', {
    bind: function (imageElement, binding, vnode) {
        imageElement.style.opacity = '0';
        imageElement.style.transition = 'opacity 0.3s ease-out';
    },
    inserted: function (imageElement) {
        imageElement.style.opacity = '0';
    },
    componentUpdated: function(imageElement) {
        imageElement.addEventListener('load', () => {
            imageElement.style.opacity = '1';
        });
    }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
