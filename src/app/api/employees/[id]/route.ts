import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: "Hello from employees/[id]", id: params.id });
}