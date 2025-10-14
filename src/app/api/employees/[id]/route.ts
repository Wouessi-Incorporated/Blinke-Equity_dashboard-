import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  return NextResponse.json({ 
    message: "Hello from employees/[id]", 
    id: resolvedParams.id 
  });
}