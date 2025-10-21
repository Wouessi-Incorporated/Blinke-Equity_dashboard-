'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, TestTube, User, Key, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [apiResult, setApiResult] = useState<any>(null);
  const [permissionsResult, setPermissionsResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(false);

  const testEmployeesAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setApiResult({
        status: response.status,
        data: data
      });
    } catch (error: any) {
      setApiResult({
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testPermissions = async () => {
    setPermissionsLoading(true);
    try {
      const response = await fetch('/api/debug/permissions');
      const data = await response.json();
      setPermissionsResult({
        status: response.status,
        data: data
      });
    } catch (error: any) {
      setPermissionsResult({
        error: error.message
      });
    } finally {
      setPermissionsLoading(false);
    }
  };

  const checkScopes = () => {
    if (!session?.accessToken) return 'No access token';

    try {
      const tokenParts = session.accessToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.scope || 'No scopes in token';
      }
    } catch (e) {
      return 'Cannot decode token';
    }

    return 'Unknown';
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading session...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Debug Console</h1>
          <p className="text-muted-foreground">
            Diagnose authentication and API issues
          </p>
        </div>
        <Badge variant={status === 'authenticated' ? 'default' : 'destructive'}>
          {status}
        </Badge>
      </div>

      <Tabs defaultValue="session" className="space-y-4">
        <TabsList>
          <TabsTrigger value="session">
            <User className="h-4 w-4 mr-2" />
            Session
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Key className="h-4 w-4 mr-2" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="api-tests">
            <TestTube className="h-4 w-4 mr-2" />
            API Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="session" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
              <CardDescription>
                Current authentication session details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={status === 'authenticated' ? 'default' : 'destructive'}>
                      {status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">User:</span>
                    <span className="text-sm">{session?.user?.email || 'Not available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Access Token:</span>
                    {getStatusIcon(!!session?.accessToken)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Token Length:</span>
                    <span className="text-sm">{session?.accessToken?.length || 0} chars</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Session Error:</span>
                    <span className="text-sm">{session?.error || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span className="text-sm">{session?.user?.name || 'Not available'}</span>
                  </div>
                </div>
              </div>

              {session?.accessToken && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Re-authentication Required
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Use the logout button in the sidebar to sign out and re-login with updated OAuth scopes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Scopes</CardTitle>
              <CardDescription>
                OAuth scopes granted to the current session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">
                  {checkScopes()}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Google Workspace Permissions</CardTitle>
              <CardDescription>
                Test various Google Workspace API permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testPermissions}
                disabled={permissionsLoading}
                className="mb-4"
              >
                {permissionsLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Permissions
                  </>
                )}
              </Button>

              {permissionsResult && (
                <div className="space-y-4">
                  {permissionsResult.data?.tests && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Authentication</span>
                            {getStatusIcon(permissionsResult.data.tests.authentication?.success)}
                          </div>
                          {permissionsResult.data.tests.authentication?.error && (
                            <p className="text-sm text-red-600 mt-2">
                              {permissionsResult.data.tests.authentication.error}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">List Users</span>
                            {getStatusIcon(permissionsResult.data.tests.listUsers?.success)}
                          </div>
                          {permissionsResult.data.tests.listUsers?.userCount && (
                            <p className="text-sm text-green-600 mt-2">
                              Found {permissionsResult.data.tests.listUsers.userCount} users
                            </p>
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Admin Access</span>
                            {getStatusIcon(permissionsResult.data.tests.adminAccess?.success)}
                          </div>
                          {permissionsResult.data.tests.adminAccess?.error && (
                            <p className="text-sm text-red-600 mt-2">
                              {permissionsResult.data.tests.adminAccess.error}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <h4 className="font-medium mb-2">Full Response:</h4>
                    <pre className="text-sm whitespace-pre-wrap overflow-auto">
                      {JSON.stringify(permissionsResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Tests</CardTitle>
              <CardDescription>
                Test various API endpoints to diagnose issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testEmployeesAPI}
                disabled={loading}
                className="mb-4"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test /api/employees
                  </>
                )}
              </Button>

              {apiResult && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Status:</span>
                    <Badge variant={apiResult.status === 200 ? 'default' : 'destructive'}>
                      {apiResult.status || 'Error'}
                    </Badge>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <h4 className="font-medium mb-2">Response:</h4>
                    <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-96">
                      {JSON.stringify(apiResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Raw Session Data */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Session Data</CardTitle>
          <CardDescription>
            Complete session object for debugging
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-96">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}