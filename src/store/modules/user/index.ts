import { defineStore } from "pinia";
import { userLogin } from "@/api";
import type { LoginData, LoginResult } from "@/api/index.ts";

export interface IUserStore {
	userName: string;
	asscessToken: string;
	refreshToken?: string;
	roles: Array<string>;
}

export const useUserStoreHook = defineStore("user", {
	// 定义状态
	state: (): IUserStore => ({
		userName: "",
		asscessToken: "",
		roles: ["common"],
	}),
	// 计算属性
	getters: {},
	// 方法
	actions: {
		storeUserLogin(data: LoginData) {
			// 登录逻辑
			userLogin(data).then((res: LoginResult) => {
				this.userName = res.username;
				this.asscessToken = res.accessToken;
			});
		},
	},
	// 持久化配置
	persist: {
		key: "user", // 存储到 localStorage 的 key
		storage: sessionStorage, // 存储方式
		pick: ["asscessToken"], // 需要持久化的状态字段
	},
});

export function useUserStore() {
	return useUserStoreHook();
}
