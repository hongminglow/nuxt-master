<template>
  <div class="bg-white p-5 rounded-lg shadow-sm mb-4">
    <div class="flex items-center">
      <div
        class="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center mr-4"
      >
        <span class="text-white text-sm font-medium">{{ icon }}</span>
      </div>
      <div class="flex-1">
        <div class="text-sm text-gray-600 mb-1">
          {{ title }}
        </div>
        <div class="text-lg font-semibold text-gray-900">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  icon: string;
}

defineProps<Props>();
</script>
