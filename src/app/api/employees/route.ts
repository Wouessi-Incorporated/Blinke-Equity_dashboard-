/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { GoogleWorkspaceService } from '@/lib/google-workspace';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const googleService = new GoogleWorkspaceService(session.accessToken);
    const usersResponse = await googleService.listUsers();
    
    const employees = usersResponse.users?.map((user: any) => ({
      id: user.id,
      firstName: user.name?.givenName || '',
      lastName: user.name?.familyName || '',
      email: user.primaryEmail,
      department: user.organizations?.[0]?.department || 'Not specified',
      jobTitle: user.organizations?.[0]?.title || 'Not specified',
      status: user.suspended ? 'suspended' : 'active',
      joinDate: user.creationTime || new Date().toISOString(),
    })) || [];

    return NextResponse.json({ 
      success: true, 
      data: employees 
    });

  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to fetch employees' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, department, jobTitle, phone } = body;

    if (!firstName || !lastName || !email || !department || !jobTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const googleService = new GoogleWorkspaceService(session.accessToken);
    const password = await googleService.generateRandomPassword();
    
    const user = await googleService.createUser({
      primaryEmail: email,
      password,
      firstName,
      lastName,
      department,
      jobTitle,
    });

    // Automated setup
    const sharedDriveId = process.env.SHARED_DRIVE_ID;
    if (sharedDriveId) {
      try {
        await googleService.grantDriveAccess(email, sharedDriveId);
      } catch (driveError) {
        console.warn('Failed to grant drive access:', driveError);
      }
    }

    try {
      await googleService.setupEmailForwarding(email, 'contractor@blinkequity.ca');
    } catch (emailError) {
      console.warn('Failed to setup email forwarding:', emailError);
    }

    try {
      await googleService.shareCalendar(email, 'contractor@blinkequity.ca', 'reader');
    } catch (calendarError) {
      console.warn('Failed to share calendar:', calendarError);
    }

    const employee = {
      id: user.id,
      firstName,
      lastName,
      email,
      department,
      jobTitle,
      phone: phone || '',
      status: 'active' as const,
      joinDate: user.creationTime || new Date().toISOString(),
    };

    return NextResponse.json({ 
      success: true, 
      data: employee,
      message: 'Employee created successfully' 
    });

  } catch (error: any) {
    console.error('Error creating employee:', error);
    
    if (error.code === 409) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to create employee' 
      },
      { status: 500 }
    );
  }
}