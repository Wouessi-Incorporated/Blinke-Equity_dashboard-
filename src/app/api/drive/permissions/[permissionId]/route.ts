import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ permissionId: string }> }
) {
  const params = await context.params;
  return NextResponse.json({ message: `Permission ID: ${params.permissionId}` });
}