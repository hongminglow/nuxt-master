<template>
	<NuxtLayout name="dashboard">
		<div class="px-4 py-6 sm:px-0">
			<div class="border-4 border-dashed border-gray-200 rounded-lg p-6">
				<div class="flex items-center justify-between mb-6">
					<h1 class="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
					<NuxtLink
						href="/report"
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
					>
						<span>View More</span>
					</NuxtLink>
				</div>

				<!-- Dashboard Cards -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<DashboardCard title="Total Users" value="1,234" icon="👥" />
					<DashboardCard title="Revenue" value="$45,678" icon="💰" />
					<DashboardCard title="Orders" value="567" icon="📦" />
					<DashboardCard title="Growth" value="+12.5%" icon="📈" />
				</div>

				<!-- Recent Activity -->
				<div class="bg-white shadow rounded-lg">
					<div class="px-4 py-5 sm:p-6">
						<h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
						<div class="flow-root">
							<ul class="divide-y divide-gray-200">
								<li class="py-3">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<div class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
												<span class="text-white text-sm">✓</span>
											</div>
										</div>
										<div class="min-w-0 flex-1">
											<p class="text-sm text-gray-500">
												<span class="font-medium text-gray-900">New user registered</span>
											</p>
											<p class="text-xs text-gray-400">2 hours ago</p>
										</div>
									</div>
								</li>
								<li class="py-3">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<div class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
												<span class="text-white text-sm">💼</span>
											</div>
										</div>
										<div class="min-w-0 flex-1">
											<p class="text-sm text-gray-500">
												<span class="font-medium text-gray-900">New order placed</span>
											</p>
											<p class="text-xs text-gray-400">4 hours ago</p>
										</div>
									</div>
								</li>
								<li class="py-3">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<div class="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
												<span class="text-white text-sm">⚠️</span>
											</div>
										</div>
										<div class="min-w-0 flex-1">
											<p class="text-sm text-gray-500">
												<span class="font-medium text-gray-900">System maintenance scheduled</span>
											</p>
											<p class="text-xs text-gray-400">6 hours ago</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Public API Example -->
				<div class="mt-8">
					<TodoList :limit="5" />
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import { NuxtLink } from "#components";

// Auth middleware
definePageMeta({
	middleware: "auth",
});
</script>
