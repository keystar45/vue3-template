import ElementPlus from "element-plus";
import { createApp } from "vue";
import CyberLogin from "./package/CyberLogin.vue";
import "@/styles/index.scss";
import "@/lib/iconfont/index.js";

createApp(CyberLogin).use(ElementPlus).mount("#app");
