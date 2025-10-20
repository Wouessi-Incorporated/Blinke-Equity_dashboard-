/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { GoogleWorkspaceService } from '@/lib/google-workspace';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const employeeId = params.id;
    const userEmail = employeeId;
    const { newEmail } = await request.json();

    if (!newEmail) {
      return NextResponse.json(
        { error: 'New email is required' },
        { status: 400 }
      );
    }

    const googleService = new GoogleWorkspaceService(session.accessToken);
    await googleService.addEmailAlias(userEmail, newEmail);

    return NextResponse.json({ 
      success: true, 
      message: 'Email alias added successfully' 
    });

  } catch (error: any) {
    console.error('Error updating email:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to update email' 
      },
      { status: 500 }
    );
  }
}