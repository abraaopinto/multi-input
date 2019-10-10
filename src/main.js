import Vue from "vue";
import App from "./App.vue";
const VueDataValidator = require("vue-data-validator");
Vue.use(VueDataValidator.validator, VueDataValidator.options);

Vue.config.productionTip = false;


new Vue({
	render: h => h(App),
}).$mount("#app");
