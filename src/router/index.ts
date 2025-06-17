import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; // 进度条插件
import "nprogress/nprogress.css"; // 进度条样式

import Home from "../views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: { title: "首页" },
	},
];

const modules: Record<string, any> = import.meta.glob("./modules/*.ts", { eager: true });
Object.keys(modules).forEach((key: string) => {
	const module = modules[key].default;
	routes.push(module);
});

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((_to, _from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
