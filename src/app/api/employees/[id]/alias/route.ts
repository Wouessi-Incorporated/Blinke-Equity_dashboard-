import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  return NextResponse.json({ message: `Alias for employee ID: ${params.id}` });
}