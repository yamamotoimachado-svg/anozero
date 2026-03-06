import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const matched = pathname.match(/^\/(pt|en)(\/|$)/);

  // If no locale prefix, redirect to cookie or default
  if (!matched) {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const targetLocale = cookieLocale === "en" ? "en" : "pt";
    url.pathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
    return Response.redirect(url);
  }

  // Persist the currently selected locale
  const response = createMiddleware({
    locales: ["pt", "en"],
    defaultLocale: "pt",
    localePrefix: "always",
    localeDetection: false,
  })(request);

  response.cookies.set({
    name: "NEXT_LOCALE",
    value: matched[1],
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
