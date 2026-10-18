import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOSTNAME = "shivamdixit.cv";
const REDIRECT_HOSTNAMES = new Set([
  "shivamdixit.vercel.app",
  "www.shivamdixit.vercel.app",
  "www.shivamdixit.cv",
]);

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (!hostname || !REDIRECT_HOSTNAMES.has(hostname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = CANONICAL_HOSTNAME;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};