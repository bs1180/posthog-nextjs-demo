import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("=middleware");
  const customUserId = request.cookies.get("CUSTOM_USER_ID");

  const response = NextResponse.next();

  if (!customUserId) {
    response.cookies.set("CUSTOM_USER_ID", crypto.randomUUID());
  }

  return response;
}
