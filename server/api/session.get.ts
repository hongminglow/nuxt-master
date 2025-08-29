import { getCookie } from "h3";
import { jwtVerify } from "jose";

const cookieName = "session";

export default defineEventHandler(async (event) => {
	const token = getCookie(event, cookieName);
	if (!token) {
		return { authenticated: false, user: null };
	}

	try {
		const config = useRuntimeConfig(event);
		const secret = new TextEncoder().encode(config.jwtSecret);
		const { payload } = await jwtVerify(token, secret);
		return {
			authenticated: true,
			user: {
				id: (payload.sub as string) || "unknown",
				email: (payload.email as string) || "",
				name: (payload.name as string) || "User",
				role: (payload.role as string) || "user",
			},
		};
	} catch {
		// Invalid or expired token
		return { authenticated: false, user: null };
	}
});
