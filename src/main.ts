import ElementPlus from "element-plus";
import { createApp } from "vue";
import router from "./router";
// 需要注意的是，样式文件需要单独引入。
import "@/styles/index.scss";
import "element-plus/dist/index.css";
import App from "./App.vue";
import directives from "./directives";

createApp(App).use(ElementPlus).use(router).use(directives).mount("#app");
