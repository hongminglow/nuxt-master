export interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  // Nuxt's useState provides server-side state hydration and global state management
  // This is different from React's useState - it's auto-imported and persists across SSR
  const user = useState<User | null>("auth.user", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Mock authentication - in real app, this would be an API call
    if (email === "admin@example.com" && password === "password") {
      user.value = {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
      };
      await navigateTo("/");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    user.value = null;
    await navigateTo("/login");
  };

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
  };
};
