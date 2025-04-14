export { auth as middleware } from "./auth";

// // export const config = { matcher: ["/orderslist/:path*", "/information/:path*"] };
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // "/orderslist/:path*",
    // "/help",
  ],
};
