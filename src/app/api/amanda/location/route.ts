import { NextResponse } from "next/server";
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
      return NextResponse.json({ error: "No location data" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
