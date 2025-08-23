<template>
  <div class="min-h-screen flex items-center justify-center bg-black p-6">
    <div
      class="max-w-xl w-full bg-white/80 rounded-lg shadow-md p-8 text-center"
    >
      <h1 class="text-6xl font-bold text-gray-800">{{ statusCode }}</h1>
      <p class="mt-4 text-xl text-gray-600">
        {{ message || "Page not found" }}
      </p>
      <p class="mt-6 text-sm text-gray-500">
        If you think this is an error, go back to the dashboard.
      </p>
      <div class="mt-6">
        <NuxtLink
          to="/"
          class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >Go home</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: { statusCode?: number; message?: string } | null;
}>();

const statusCode = props.error?.statusCode ?? 404;
const message = props.error?.message ?? "";
</script>

<style scoped>
/* keep it minimal — Tailwind handles styling */
</style>
