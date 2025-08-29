<template>
	<div class="p-6">
		<div class="flex items-center justify-between mb-6">
			<h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
			<div class="flex items-center gap-3">
				<button @click="exportCsv" class="px-3 py-1.5 bg-gray-800 text-white rounded text-sm hover:bg-black">
					Export CSV
				</button>
			</div>
		</div>

		<!-- Summary cards -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			<div class="p-4 bg-white rounded shadow">
				<div class="text-sm text-gray-500">Total Reports</div>
				<div class="text-2xl font-bold">{{ rows.length }}</div>
			</div>
			<div class="p-4 bg-white rounded shadow">
				<div class="text-sm text-gray-500">Total Amount</div>
				<div class="text-2xl font-bold">${{ totalAmount.toLocaleString() }}</div>
			</div>
			<div class="p-4 bg-white rounded shadow">
				<div class="text-sm text-gray-500">Processed</div>
				<div class="text-2xl font-bold">{{ processedCount }}</div>
			</div>
			<div class="p-4 bg-white rounded shadow">
				<div class="text-sm text-gray-500">Pending</div>
				<div class="text-2xl font-bold">{{ pendingCount }}</div>
			</div>
		</div>

		<!-- Filters -->
		<div class="mb-4 flex gap-3 items-center">
			<input
				v-model="filter"
				type="text"
				placeholder="Search by name or id..."
				class="px-3 py-2 border rounded w-full sm:w-64"
			/>
			<select v-model="status" class="px-3 py-2 border rounded">
				<option value="">All</option>
				<option value="processed">Processed</option>
				<option value="pending">Pending</option>
			</select>

			<button @click="triggerReset" class="border border-gray-300 p-2 rounded-md">
				<RotateCcw class="text-blue-600" />
			</button>
		</div>

		<!-- Table -->
		<div class="bg-white shadow rounded">
			<table class="w-full text-left">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-4 py-3 text-xs text-gray-500">ID</th>
						<th class="px-4 py-3 text-xs text-gray-500">Name</th>
						<th class="px-4 py-3 text-xs text-gray-500">Date</th>
						<th class="px-4 py-3 text-xs text-gray-500">Amount</th>
						<th class="px-4 py-3 text-xs text-gray-500">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="r in filteredRows" :key="r.id" class="border-t hover:bg-gray-50">
						<td class="px-4 py-3 text-sm text-gray-700">{{ r.id }}</td>
						<td class="px-4 py-3 text-sm text-gray-700">{{ r.name }}</td>
						<td class="px-4 py-3 text-sm text-gray-700">{{ r.date }}</td>
						<td class="px-4 py-3 text-sm text-gray-700">${{ r.amount }}</td>
						<td class="px-4 py-3 text-sm">
							<span :class="r.status === 'processed' ? 'text-green-600' : 'text-yellow-600'">
								{{ r.status }}
							</span>
						</td>
					</tr>
					<tr v-if="filteredRows.length === 0">
						<td colspan="5" class="px-4 py-6 text-center text-sm text-gray-500">No results</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="bg-white shadow rounded my-4 p-4">
			<ReportCard ref="innerInput" :search-val="filter" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { RotateCcw } from "lucide-vue-next";

definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

type Row = {
	id: string;
	name: string;
	date: string;
	amount: number;
	status: "processed" | "pending";
};

type TReportCardExpose = {
	handleReset: () => void;
};

// sample hardcoded rows
const rows = ref<Row[]>([
	{ id: "R-001", name: "Acme Corp", date: "2025-08-01", amount: 1200, status: "processed" },
	{ id: "R-002", name: "Beta LLC", date: "2025-08-03", amount: 450, status: "pending" },
	{ id: "R-003", name: "Gamma Inc", date: "2025-08-04", amount: 980, status: "processed" },
	{ id: "R-004", name: "Delta Co", date: "2025-08-06", amount: 230, status: "pending" },
]);

const filter = ref("");
const status = ref("");
const innerInput = shallowRef<TReportCardExpose | null>(null);

const filteredRows = computed(() => {
	return rows.value.filter((r) => {
		if (status.value && r.status !== status.value) return false;
		const q = filter.value.trim().toLowerCase();
		if (!q) return true;
		return r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q);
	});
});

const totalAmount = computed(() => rows.value.reduce((s, r) => s + r.amount, 0));
const processedCount = computed(() => rows.value.filter((r) => r.status === "processed").length);
const pendingCount = computed(() => rows.value.filter((r) => r.status === "pending").length);

// simple CSV export of filtered rows
function exportCsv() {
	const header = ["id", "name", "date", "amount", "status"];
	const csv = [
		header.join(","),
		...filteredRows.value.map((r) =>
			[r.id, r.name, r.date, r.amount, r.status].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
		),
	].join("\n");

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `report-${new Date().toISOString().slice(0, 10)}.csv`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

function triggerReset() {
	innerInput.value?.handleReset?.();
}
</script>
