import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "GET method" });
}

export function POST() {}
