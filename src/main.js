import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// Vue.config.productionTip = false
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
