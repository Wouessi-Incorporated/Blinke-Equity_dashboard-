'use client';

import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Employees', value: '0', description: 'Active team members' },
    { name: 'Active Users', value: '1', description: 'Currently active' },
    { name: 'Drive Storage', value: '0 MB', description: 'Shared drive usage' },
    { name: 'Pending Tasks', value: '0', description: 'Awaiting action' },
  ];

  const quickActions = [
    {
      title: 'Add Employee',
      description: 'Onboard new team member',
      href: '/dashboard/employees/add',
      icon: '👤',
    },
    {
      title: 'Manage Team',
      description: 'View all employees',
      href: '/dashboard/employees',
      icon: '👥',
    },
    {
      title: 'Upload Files',
      description: 'Share documents with team',
      href: '/dashboard/shared-drive/upload',
      icon: '📁',
    },
    {
      title: 'Browse Drive',
      description: 'Access shared files',
      href: '/dashboard/shared-drive',
      icon: '🔍',
    },
  ];

  const recentActivity = [
    { id: 1, action: 'You signed in', time: 'Just now', type: 'authentication' },
    { id: 2, action: 'Welcome to Brinkly Dashboard', time: '5 minutes ago', type: 'system' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your team today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center justify-center space-y-2"
              >
                <Link href={action.href}>
                  <span className="text-2xl">{action.icon}</span>
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`rounded-full p-2 ${
                    activity.type === 'authentication' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'authentication' ? '🔒' : '⚙️'}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Google Workspace integration status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Admin SDK</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Drive API</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Calendar API</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Gmail API</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}