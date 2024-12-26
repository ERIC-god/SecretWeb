import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "@/router/index.js";
import { useREM } from "./utils/flexible";
import useTheme from "./utils/theme";
import mLibs from "@/libs/index.js";
import "./style/index.scss";

// 注册svg-icons
import "virtual:svg-icons-register";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(mLibs);
useREM();
useTheme();

app.mount("#app");
