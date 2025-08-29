export default defineNuxtRouteMiddleware(async () => {
	const { isLoggedIn, initSession } = useAuth();
	if (!isLoggedIn.value) {
		await initSession();
		return navigateTo("/login");
	}
});
