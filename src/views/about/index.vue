<template>
	<div>
		{{ msg }}
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

let a = "Hello Vue 3!";

const msg = ref("Hello Vue 3!");

onMounted(() => {
	console.log("mounted!");
});
</script>
