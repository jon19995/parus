import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import store from "@/store";

Vue.prototype.$axios = axios;

new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
