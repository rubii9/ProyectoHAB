import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueHeadful from "vue-headful";
import LottiePlayer from "lottie-player-vue";

//Componente para nombrar las pestañas
Vue.component("vue-headful", vueHeadful);

//Componente para animaciones
Vue.use("lottie-player", LottiePlayer);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
