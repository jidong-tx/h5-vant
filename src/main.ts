// 导入Vue和必要的模块
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 导入全局样式
import "virtual:uno.css";
import "./styles/index.scss";
import pinia from "./store";

// 创建Vue应用实例
const app = createApp(App);
// 注册路由插件
app.use(router);
// 注册pinia插件
app.use(pinia);
// 挂载应用到DOM元素上
app.mount("#app");
