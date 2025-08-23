<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
      Latest Todos ({{ limit }})
    </h3>
    <div v-if="pending" class="text-gray-500">Loading…</div>
    <div v-else-if="error" class="text-red-600">
      Failed to load: {{ error.message }}
    </div>
    <ul v-else class="divide-y divide-gray-200">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="py-2 flex items-start gap-3"
      >
        <span
          class="mt-1 inline-block h-3 w-3 rounded-full"
          :class="todo.completed ? 'bg-green-500' : 'bg-yellow-500'"
        />
        <span class="text-sm text-gray-800">{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "~/composables/usePublicTodos";
const props = defineProps<{ limit?: number }>();
const limit = computed(() => props.limit ?? 5);

const { data, pending, error } = usePublicTodos(limit);

const todos = computed<Todo[]>(() => data.value ?? []);
</script>
