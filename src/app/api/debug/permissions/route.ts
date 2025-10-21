/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { GoogleWorkspaceService } from '@/lib/google-workspace';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.accessToken) {
            return NextResponse.json({ error: 'No session or access token' }, { status: 401 });
        }

        const googleService = new GoogleWorkspaceService(session.accessToken);

        // Test various permissions
        const tests: {
            authentication: any;
            listUsers: any;
            adminAccess: any;
        } = {
            authentication: { success: false, error: null },
            listUsers: { success: false, error: null },
            adminAccess: { success: false, error: null }
        };

        // Test 1: Basic authentication
        try {
            const authTest = await googleService.testAuthentication();
            tests.authentication = authTest;
        } catch (error: any) {
            tests.authentication = { success: false, error: error.message };
        }

        // Test 2: List users (requires admin.directory.user.readonly)
        try {
            const users = await googleService.listUsers();
            tests.listUsers = {
                success: true,
                error: null,
                userCount: users.users?.length || 0
            };
        } catch (error: any) {
            tests.listUsers = { success: false, error: error.message };
        }

        // Test 3: Check if user has admin privileges
        try {
            // Try to access organizational units (admin-only operation)
            const response = await googleService.admin.orgunits.list({
                customerId: 'my_customer'
            });
            tests.adminAccess = {
                success: true,
                error: null,
                orgUnits: response.data.organizationUnits?.length || 0
            };
        } catch (error: any) {
            tests.adminAccess = { success: false, error: error.message };
        }

        return NextResponse.json({
            success: true,
            user: session.user?.email,
            tokenLength: session.accessToken.length,
            tests
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            details: error.response?.data
        }, { status: 500 });
    }
}