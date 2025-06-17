<template>
	<div>
		<div>我是首页</div>
		<div class="box"></div>
		<van-button type="primary" size="small" @click="addCount">+</van-button>
		<span>{{ settingStore.count }}</span>
	</div>
</template>

<script setup>
import { useSettingStore } from "@/store/setting.ts";
const settingStore = useSettingStore();

const addCount = () => {
	settingStore.increment();
};
</script>

<style lang="scss" scoped>
.box {
	width: 100px;
	height: 100px;
	background-color: red;
}
</style>
