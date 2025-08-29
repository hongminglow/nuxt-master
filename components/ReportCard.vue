<template>
	<div class="grid grid-cols-[auto_1fr] gap-4">
		<span>Name</span>
		<input v-model="inputVal" />
	</div>
</template>

<script setup lang="ts">
const inputVal = ref("");

function handleReset() {
	inputVal.value = "";
}

defineExpose({
	handleReset,
});
</script>
