import { defineConfig } from "vite";
// import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import ViteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { VantResolver } from '@vant/auto-import-resolver';

//引入UnoCSS插件
import UnoCSS from "unocss/vite";

// import brotli from "rollup-plugin-brotli";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	console.log("当前环境", mode);
	// 获取当前工作目录
	const root = process.cwd();
	console.log("当前工作目录", root);
	// 获取环境变量
	// const env = loadEnv(mode, root);
	return {
		// 项目根目录
		root,
		// 项目部署的基础路径
		base: "/",
		publicDir: fileURLToPath(new URL("./public", import.meta.url)), // 无需处理的静态资源位置
		assetsInclude: fileURLToPath(new URL("./src/assets", import.meta.url)), // 需要处理的静态资源位置
		plugins: [
			// Vue模板文件编译插件
			vue(),
			// jsx文件编译插件
			vueJsx(),
			// 开发环境调试插件
			vueDevTools(),
			ViteCompression({
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: "gzip",
				ext: ".gz", // 生成的压缩包后缀
			}),
			// brotli()
			AutoImport({
				imports: ["vue", "vue-router", "pinia"],
				resolvers: [VantResolver()],
				eslintrc: {
					enabled: true,
				},
			}),
			Components({
				resolvers: [VantResolver()],
			}),
			UnoCSS(),
		],
		// 运行后本地预览的服务器
		server: {
			// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
			host: true,
			// 开发环境预览服务器端口
			port: 3000,
			// 启动后是否自动打开浏览器
			open: false,
			// 是否开启CORS跨域
			cors: true,
			// 代理服务器
			// 帮助我们开发时解决跨域问题
			proxy: {
				// 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
				"/api": {
					target: "http://xxx:9000",
					// 改变 Host Header
					changeOrigin: true,
					// 发起请求时将 '/api' 替换为 ''
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		// 打包配置
		build: {
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 400kb 提示警告
			chunkSizeWarningLimit: 400,
			rollupOptions: {
				// 打包入口文件 根目录下的 index.html
				// 也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(new URL("./index.html", import.meta.url)),
				},
				// 静态资源分类打包
				output: {
					format: "esm",
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
				},
			},
		},
		// 配置别名
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"#": fileURLToPath(new URL("./types", import.meta.url)),
			},
		},
	};
});
