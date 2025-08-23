<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md"
    >
      {{ error }}
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
        Email address
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        placeholder="Enter your email"
      />
    </div>

    <div>
      <label
        for="password"
        class="block text-sm font-medium text-gray-700 mb-1.5"
      >
        Password
      </label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        class="w-full p-3 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        placeholder="Enter your password"
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full p-3 bg-indigo-600 text-white border-none rounded-md text-base font-medium cursor-pointer hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <span v-if="loading">Signing in...</span>
      <span v-else>Sign in</span>
    </button>
  </form>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";

const { login } = useAuth();

const form = reactive({
  email: "admin@example.com",
  password: "password",
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";

  try {
    await login(form.email, form.password);
  } catch (err) {
    error.value = err.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>
