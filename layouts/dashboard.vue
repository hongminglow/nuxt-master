<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">Welcome, {{ user?.name }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto py-6 px-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { user, logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
