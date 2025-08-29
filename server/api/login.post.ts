import type { H3Event } from "h3";
import { readBody, setCookie, createError } from "h3";
import { SignJWT } from "jose";

const cookieName = "session";

export default defineEventHandler(async (event: H3Event) => {
	const body = await readBody<{ email?: string; password?: string }>(event);
	const email = body?.email || "";
	const password = body?.password || "";

	// Hardcoded credentials for demo purposes
	if (email !== "admin@example.com" || password !== "password") {
		throw createError({ statusCode: 401, statusMessage: "Invalid credentials" });
	}

	const config = useRuntimeConfig(event);
	const secret = new TextEncoder().encode(config.jwtSecret);

	const payload = {
		sub: "1",
		email,
		name: "Admin User",
		role: "admin",
	};

	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(secret);

	// HttpOnly cookie; secure flag in prod
	setCookie(event, cookieName, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60, // 1 hour
	});

	return { ok: true };
});
