import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", {
	state: () => {
		return {
			count: 0,
		};
	},
	actions: {
		/**
		 * 增加计数器值
		 *
		 * 将当前对象的 `count` 属性值加 1
		 */
		increment() {
			this.count++;
		},
	},
});
