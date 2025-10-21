import { type NextRequest, NextResponse } from "next/server";

export async function POST() {
  // Logic to handle email forwarding will go here
  return NextResponse.json({ message: "Hello from /api/gmail/forward" });
}