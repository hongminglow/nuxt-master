import type { User } from "~/types";

type Session = {
	authenticated: boolean;
	user: User | null;
};

export const useAuth = () => {
	// Nuxt's useState provides server-side state hydration and global state management
	// This is different from React's useState - it's auto-imported and persists across SSR
	const user = useState<User | null>("auth.user", () => null);
	const isLoggedIn = computed(() => !!user.value);

	const login = async (email: string, password: string) => {
		if (!email || !password) throw new Error("Email and password are required");
		try {
			await $fetch("/api/login", { method: "POST", body: { email, password } });
			const session = await $fetch<Session>("/api/session");
			user.value = session.authenticated ? session.user : null;
			await navigateTo("/");
		} catch (e: unknown) {
			const err = e as { data?: { message?: string }; message?: string };
			throw new Error(err?.data?.message || err?.message || "Login failed");
		}
	};

	const logout = async () => {
		await $fetch("/api/logout", { method: "POST" });
		user.value = null;
		await navigateTo("/login");
	};

	// Helper to initialize session from server on first load
	const initSession = async () => {
		try {
			const session = await $fetch<Session>("/api/session");
			user.value = session.authenticated ? session.user : null;
		} catch {
			user.value = null;
		}
	};

	return {
		user: readonly(user),
		isLoggedIn,
		login,
		logout,
		initSession,
	};
};
