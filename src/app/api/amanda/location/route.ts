import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KV_KEY = "location:latest";

export async function GET() {
  try {
    const data = await kv.get(KV_KEY);
    if (!data) {
      return NextResponse.json({ error: "No location data yet" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body.lat !== "number" || typeof body.lng !== "number") {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }

    await kv.set(KV_KEY, {
      lat: body.lat,
      lng: body.lng,
      timestamp: body.timestamp || Date.now(),
      accuracy: body.accuracy,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
