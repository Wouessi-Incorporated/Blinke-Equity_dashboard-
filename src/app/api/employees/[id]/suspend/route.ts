/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { GoogleWorkspaceService } from '@/lib/google-workspace';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: employeeId } = await params;
    const userEmail = employeeId;

    const googleService = new GoogleWorkspaceService(session.accessToken);
    await googleService.suspendUser(userEmail);

    const sharedDriveId = process.env.SHARED_DRIVE_ID;
    if (sharedDriveId) {
      try {
        await googleService.revokeDriveAccess(userEmail, sharedDriveId);
      } catch (driveError) {
        console.warn('Failed to revoke drive access:', driveError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Employee suspended successfully'
    });

  } catch (error: any) {
    console.error('Error suspending employee:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to suspend employee'
      },
      { status: 500 }
    );
  }
}