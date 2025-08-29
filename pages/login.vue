<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-300 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8">
			<div class="text-center">
				<h2 class="text-3xl font-extrabold text-gray-900 mb-4">Sign in to your account</h2>
				<p class="text-sm text-gray-600">Use <strong>admin@example.com</strong> / <strong>password</strong> to login</p>
			</div>

			<div class="bg-gray-50 py-8 px-6 shadow rounded-lg">
				<LoginForm />
				<div class="mt-6 border-t pt-4">
					<p class="text-xs text-gray-500 mb-2">Dev helper: Inspect current session (/api/session)</p>
					<div class="flex items-center gap-3 mb-2">
						<button
							class="px-3 py-1.5 text-xs rounded bg-gray-800 text-white hover:bg-gray-900"
							@click="inspectSession"
						>
							Inspect session
						</button>
						<button class="px-3 py-1.5 text-xs rounded bg-gray-200 hover:bg-gray-300" @click="clearSession">
							Clear (logout)
						</button>
					</div>
					<pre v-if="sessionJson" class="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-56">{{ sessionJson }}</pre>
				</div>
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

const sessionJson = ref("");
const inspectSession = async () => {
	const data = await $fetch("/api/session");
	sessionJson.value = JSON.stringify(data, null, 2);
};
const clearSession = async () => {
	await $fetch("/api/logout", { method: "POST" });
	sessionJson.value = "";
};
</script>
