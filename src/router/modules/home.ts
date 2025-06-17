export default {
	name: "Home",
	path: "/",
	redirect: "/home",
	component: () => import("@/layout/index.vue"),
	meta: {
		role: ["admin", "user"],
	},
	children: [
		{
			path: "/home",
			name: "HomePage",
			component: () => import("@/views/home/index.vue"),
			meta: { title: "首页" },
		},
		{
			path: "/search",
			name: "Search",
			component: () => import("@/views/search/index.vue"),
			meta: { title: "搜索" },
		},
		{
			path: "/setting",
			name: "Setting",
			component: () => import("@/views/setting/index.vue"),
			meta: { title: "设置" },
		},
	],
};
