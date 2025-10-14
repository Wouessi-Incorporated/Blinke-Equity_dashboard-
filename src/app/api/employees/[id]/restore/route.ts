import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  return NextResponse.json({ message: `Restoring employee ID: ${params.id}` });
}