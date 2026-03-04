import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

const AGENT_BASE_URL = process.env.AGENT_BASE_URL;

// POST — admin only, proxy to Gh0st Agent v2
export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!AGENT_BASE_URL) {
    return NextResponse.json(
      { error: "Agent not configured" },
      { status: 503 }
    );
  }

  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { error: "Missing text field" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const agentRes = await fetch(`${AGENT_BASE_URL}/voice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await agentRes.json();
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json({ error: "Agent timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "Agent unreachable" }, { status: 502 });
  }
}
