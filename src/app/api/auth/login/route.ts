import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const users = new Map<string, { email: string }>();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 },
    );
  }

  let user = users.get(email);
  const isNewUser = !user;

  if (!user) {
    user = { email };
    users.set(email, user);
  }

  // Capture server-side login event
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: email,
    event: "server_login",
    properties: {
      email: email,
      isNewUser: isNewUser,
      source: "api",
    },
  });

  // Identify user on server side - useful if they block the JS on the client
  posthog.identify({
    distinctId: email,
    properties: {
      email: email,
      createdAt: isNewUser ? new Date().toISOString() : undefined,
    },
  });

  return NextResponse.json({ success: true, user });
}
