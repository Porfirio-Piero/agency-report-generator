import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware that allows all requests through
// Authentication is handled by Clerk in the app itself
export function middleware(request: NextRequest) {
  // Allow all requests to proceed
  return NextResponse.next();
}

export const config = {
  // Match all paths except static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};