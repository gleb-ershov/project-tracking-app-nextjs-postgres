import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const currentPath = req.nextUrl.pathname;
	const isPublic = currentPath === "/sign-in" || currentPath === "/sign-up";
	const token = req.cookies.get("token")?.value || "";

	if (isPublic && token.length > 0) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}
	if (!isPublic && token.length <= 0) {
		return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
	}
}

export const config = {
	matcher: ["/sign-in", "/sign-up"],
};
