<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-300 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-4">
          Sign in to your account
        </h2>
        <p class="text-sm text-gray-600">
          Use <strong>admin@example.com</strong> / <strong>password</strong> to
          login
        </p>
      </div>

      <div class="bg-gray-50 py-8 px-6 shadow rounded-lg">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup>
// Guest middleware - redirect if already logged in
definePageMeta({
  middleware: "guest",
  layout: false,
});
</script>
