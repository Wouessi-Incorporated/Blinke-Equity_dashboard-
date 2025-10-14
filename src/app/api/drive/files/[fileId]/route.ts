import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  const params = await context.params;
  return NextResponse.json({ message: `File ID: ${params.fileId}` });
}