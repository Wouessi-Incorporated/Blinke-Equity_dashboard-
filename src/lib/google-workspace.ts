/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';

export class GoogleWorkspaceService {
  private admin: any;
  private drive: any;
  private calendar: any;
  private gmail: any;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    try {
      const auth = new google.auth.OAuth2();
      auth.setCredentials({
        access_token: accessToken,
      });

      this.admin = google.admin({
        version: 'directory_v1',
        auth: auth,
      });

      this.drive = google.drive({
        version: 'v3',
        auth: auth,
      });

      this.calendar = google.calendar({
        version: 'v3',
        auth: auth,
      });

      this.gmail = google.gmail({
        version: 'v1',
        auth: auth,
      });
    } catch (error) {
      console.error('Error initializing Google Workspace service:', error);
      throw error;
    }
  }

  // Test authentication
  async testAuthentication() {
    try {
      const response = await this.admin.users.list({
        domain: 'blinkequity.ca',
        maxResults: 1,
      });
      return { 
        success: true, 
        userCount: response.data.users?.length || 0,
        domain: response.data.users?.[0]?.primaryEmail?.split('@')[1]
      };
    } catch (error: any) {
      console.error('Authentication test failed:', {
        message: error.message,
        code: error.code,
        response: error.response?.data
      });
      return { 
        success: false, 
        error: error.message,
        code: error.code,
        details: error.response?.data
      };
    }
  }

  // USER MANAGEMENT
  async listUsers(domain: string = 'blinkequity.ca') {
    try {
      console.log('Fetching users from domain:', domain);
      const response = await this.admin.users.list({
        domain,
        orderBy: 'familyName',
        maxResults: 100,
      });
      
      console.log(`Found ${response.data.users?.length || 0} users`);
      return response.data;
    } catch (error: any) {
      console.error('Error in listUsers:', {
        message: error.message,
        code: error.code,
        response: error.response?.data
      });
      throw error;
    }
  }

  async createUser(userData: {
    primaryEmail: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
    jobTitle: string;
  }) {
    const user = {
      primaryEmail: userData.primaryEmail,
      password: userData.password,
      name: {
        givenName: userData.firstName,
        familyName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
      },
      organizations: [
        {
          name: 'BlinkEquity',
          title: userData.jobTitle,
          department: userData.department,
          primary: true,
        },
      ],
      orgUnitPath: '/Employees/Active',
    };

    const response = await this.admin.users.insert({ requestBody: user });
    return response.data;
  }

  async suspendUser(userEmail: string) {
    await this.admin.users.update({
      userKey: userEmail,
      requestBody: { suspended: true }
    });

    await this.admin.users.update({
      userKey: userEmail,
      requestBody: { orgUnitPath: '/Employees/Inactive' }
    });

    return { success: true };
  }

  async addEmailAlias(userEmail: string, alias: string) {
    return await this.admin.users.aliases.insert({
      userKey: userEmail,
      requestBody: { alias }
    });
  }

  async getUser(userEmail: string) {
    const response = await this.admin.users.get({ userKey: userEmail });
    return response.data;
  }

  // DRIVE MANAGEMENT
  async grantDriveAccess(userEmail: string, driveId: string, role: string = 'fileOrganizer') {
    return await this.drive.permissions.create({
      fileId: driveId,
      supportsAllDrives: true,
      requestBody: {
        type: 'user',
        role: role,
        emailAddress: userEmail,
      },
    });
  }

  async revokeDriveAccess(userEmail: string, driveId: string) {
    const permissions = await this.drive.permissions.list({
      fileId: driveId,
      supportsAllDrives: true,
    });

    const userPermission = permissions.data.permissions?.find(
      (p: any) => p.emailAddress === userEmail
    );

    if (userPermission) {
      await this.drive.permissions.delete({
        fileId: driveId,
        permissionId: userPermission.id!,
        supportsAllDrives: true,
      });
    }
  }

  // CALENDAR MANAGEMENT
  async shareCalendar(userEmail: string, targetEmail: string, role: string = 'reader') {
    const calendarId = userEmail;
    return await this.calendar.acl.insert({
      calendarId,
      requestBody: {
        role: role,
        scope: {
          type: 'user',
          value: targetEmail,
        },
      },
    });
  }

  // GMAIL MANAGEMENT
  async setupEmailForwarding(userEmail: string, forwardTo: string) {
    return await this.gmail.users.settings.updateAutoForwarding({
      userId: userEmail,
      requestBody: {
        enabled: true,
        emailAddress: forwardTo,
        disposition: 'leaveInInbox',
      },
    });
  }

  // UTILITY METHODS
  async generateRandomPassword(): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}