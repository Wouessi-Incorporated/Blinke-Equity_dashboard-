'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function SettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    companyName: 'BlinkEquity',
    domain: 'blinkequity.ca',
    timezone: 'America/New_York',
    language: 'English',
  });

  const [apiSettings, setApiSettings] = useState({
    googleWorkspaceEnabled: true,
    driveSyncEnabled: true,
    calendarSyncEnabled: true,
    gmailDelegationEnabled: true,
  });

  const handleSaveCompanySettings = () => {
    console.log('Saving company settings:', companySettings);
  };

  const handleSaveApiSettings = () => {
    console.log('Saving API settings:', apiSettings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your organization&apos;s settings and preferences</p>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your organization&apos;s basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companySettings.companyName}
                    onChange={(e) => setCompanySettings(prev => ({
                      ...prev,
                      companyName: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={companySettings.domain}
                    onChange={(e) => setCompanySettings(prev => ({
                      ...prev,
                      domain: e.target.value
                    }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full p-2 border rounded-md"
                    value={companySettings.timezone}
                    onChange={(e) => setCompanySettings(prev => ({
                      ...prev,
                      timezone: e.target.value
                    }))}
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="w-full p-2 border rounded-md"
                    value={companySettings.language}
                    onChange={(e) => setCompanySettings(prev => ({
                      ...prev,
                      language: e.target.value
                    }))}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleSaveCompanySettings}>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default Employee Settings</CardTitle>
              <CardDescription>
                Configure default settings for new employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoCreateEmail" defaultChecked />
                  <Label htmlFor="autoCreateEmail">Automatically create Google Workspace email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoGrantDrive" defaultChecked />
                  <Label htmlFor="autoGrantDrive">Automatically grant shared drive access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoSetupDelegation" defaultChecked />
                  <Label htmlFor="autoSetupDelegation">Automatically setup mailbox delegation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoShareCalendar" defaultChecked />
                  <Label htmlFor="autoShareCalendar">Automatically share calendar</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Integration Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Workspace Integration</CardTitle>
              <CardDescription>
                Manage your Google Workspace API connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🔗</div>
                    <div>
                      <div className="font-medium">Google Workspace API</div>
                      <div className="text-sm text-muted-foreground">
                        Connected to your Google Workspace domain
                      </div>
                    </div>
                  </div>
                  <Badge variant="default">Connected</Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">API Services</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="googleWorkspaceEnabled"
                        checked={apiSettings.googleWorkspaceEnabled}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          googleWorkspaceEnabled: e.target.checked
                        }))}
                      />
                      <Label htmlFor="googleWorkspaceEnabled">Admin Directory API</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="driveSyncEnabled"
                        checked={apiSettings.driveSyncEnabled}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          driveSyncEnabled: e.target.checked
                        }))}
                      />
                      <Label htmlFor="driveSyncEnabled">Drive API</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="calendarSyncEnabled"
                        checked={apiSettings.calendarSyncEnabled}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          calendarSyncEnabled: e.target.checked
                        }))}
                      />
                      <Label htmlFor="calendarSyncEnabled">Calendar API</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="gmailDelegationEnabled"
                        checked={apiSettings.gmailDelegationEnabled}
                        onChange={(e) => setApiSettings(prev => ({
                          ...prev,
                          gmailDelegationEnabled: e.target.checked
                        }))}
                      />
                      <Label htmlFor="gmailDelegationEnabled">Gmail API</Label>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">API Usage</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Admin SDK Quota Used:</span>
                      <span>245 / 2,400 requests</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Drive API Quota Used:</span>
                      <span>89 / 12,000 requests</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Sync:</span>
                      <span>2024-01-16 14:30:25</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveApiSettings}>
                  Save API Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option selected>1 hour</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="require2fa" />
                <Label htmlFor="require2fa">Require two-factor authentication for all admins</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auditLogging" defaultChecked />
                <Label htmlFor="auditLogging">Enable comprehensive audit logging</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ipWhitelist" />
                <Label htmlFor="ipWhitelist">Enable IP address whitelisting</Label>
              </div>
              <Button>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailEmployeeCreate" defaultChecked />
                    <Label htmlFor="emailEmployeeCreate">New employee creation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailEmployeeSuspend" defaultChecked />
                    <Label htmlFor="emailEmployeeSuspend">Employee suspension</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailApiErrors" defaultChecked />
                    <Label htmlFor="emailApiErrors">API integration errors</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailSecurity" defaultChecked />
                    <Label htmlFor="emailSecurity">Security alerts</Label>
                  </div>
                </div>
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Badge component for settings page
function Badge({ variant = 'default', children }: { variant?: 'default' | 'secondary' | 'destructive'; children: React.ReactNode }) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}