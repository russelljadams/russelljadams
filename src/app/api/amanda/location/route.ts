import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KV_KEY = "location:latest";

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
}

export async function GET() {
  try {
    const data = await kv.get<LocationData>(KV_KEY);
    if (!data) {
      return NextResponse.json({ error: "No location data yet" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Could not fetch location" }, { status: 500 });
  }
}

// POST — Phone pushes location
// TODO: re-add auth once env vars are confirmed working
export async function POST(req: NextRequest) {
  try {
    const body: LocationData = await req.json();
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
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
