import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

const AGENT_BASE_URL = process.env.AGENT_BASE_URL;

// GET — any authenticated user can check agent health
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!AGENT_BASE_URL) {
    return NextResponse.json({ status: "not_configured" }, { status: 503 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${AGENT_BASE_URL}/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json();
    return NextResponse.json({ status: "online", ...data });
  } catch {
    return NextResponse.json({ status: "offline" });
  }
}
