import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getUser } from "@/lib/auth";

const KV_KEY = "contact:submissions";
const MAX_SUBMISSIONS = 100;

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

// POST — public, anyone can submit
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    // Prepend to list (newest first), trim to max
    await kv.lpush(KV_KEY, submission);
    await kv.ltrim(KV_KEY, 0, MAX_SUBMISSIONS - 1);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — authenticated users only, fetch all submissions
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions =
    (await kv.lrange<ContactSubmission>(KV_KEY, 0, -1)) ?? [];

  return NextResponse.json(submissions);
}
