import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { getUser } from "@/lib/auth";

const KV_KEY = "location:latest";

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
  accuracy?: number;
}

// GET — authenticated dashboard users fetch latest location
export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await kv.get<LocationData>(KV_KEY);
  if (!data) {
    return NextResponse.json({ error: "No location data" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// POST — phone pushes location with API key auth
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.AGENT_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body: LocationData = await req.json();

    if (typeof body.lat !== "number" || typeof body.lng !== "number") {
      return NextResponse.json(
        { error: "Invalid location data" },
        { status: 400 }
      );
    }

    const data: LocationData = {
      lat: body.lat,
      lng: body.lng,
      timestamp: body.timestamp || Date.now(),
      accuracy: body.accuracy,
    };

    await kv.set(KV_KEY, data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
