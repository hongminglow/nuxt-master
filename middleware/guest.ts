export default defineNuxtRouteMiddleware(async () => {
	const { isLoggedIn, initSession } = useAuth();
	await initSession();

	if (isLoggedIn.value) {
		return navigateTo("/");
	}
});
