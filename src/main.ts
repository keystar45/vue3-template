import ElementPlus from "element-plus";
import { createApp } from "vue";
import CyberLogin from "./package/CyberLogin.vue";
import "@/lib/iconfont/index.js";
import "element-plus/dist/index.css";

createApp(CyberLogin).use(ElementPlus).mount("#app");
