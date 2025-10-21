/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { GoogleWorkspaceService } from '@/lib/google-workspace';

export async function GET() {
  try {
    console.log('=== Starting /api/employees ===');
    
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.error('No session found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!session.accessToken) {
      console.error('No access token in session');
      return NextResponse.json({ error: 'No access token' }, { status: 401 });
    }

    console.log('Session user:', session.user?.email);
    console.log('Access token exists, length:', session.accessToken.length);

    // Test authentication first
    const googleService = new GoogleWorkspaceService(session.accessToken);
    const authTest = await googleService.testAuthentication();
    
    console.log('Authentication test result:', authTest);
    
    if (!authTest.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Google API authentication failed',
          details: authTest.error,
          code: authTest.code
        },
        { status: 401 }
      );
    }

    console.log('Authentication successful, fetching users...');
    
    // Fetch users from Google Workspace
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

    console.log(`Successfully processed ${employees.length} employees`);
    
    return NextResponse.json({ 
      success: true, 
      data: employees 
    });

  } catch (error: any) {
    console.error('=== ERROR in /api/employees ===');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch employees',
        details: error.message,
        code: error.code
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
    
    // Test authentication first
    const authTest = await googleService.testAuthentication();
    if (!authTest.success) {
      return NextResponse.json(
        { error: 'Google API authentication failed: ' + authTest.error },
        { status: 401 }
      );
    }

    const password = await googleService.generateRandomPassword();
    
    // Create user in Google Workspace
    const user = await googleService.createUser({
      primaryEmail: email,
      password,
      firstName,
      lastName,
      department,
      jobTitle,
    });

    // Automated setup (optional - can fail gracefully)
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