import { deleteCookie } from "h3";

const cookieName = "session";

export default defineEventHandler(async (event) => {
	deleteCookie(event, cookieName, { path: "/" });
	return { ok: true };
});
