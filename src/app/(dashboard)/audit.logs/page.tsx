'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock audit data
const auditLogs = [
  {
    id: '1',
    timestamp: '2024-01-16 14:30:25',
    user: 'admin@blinkequity.ca',
    action: 'USER_CREATE',
    resource: 'john.doe@blinkequity.ca',
    status: 'success',
    details: 'Created new employee account',
    ip: '192.168.1.100',
  },
  {
    id: '2',
    timestamp: '2024-01-16 14:25:10',
    user: 'admin@blinkequity.ca',
    action: 'FILE_UPLOAD',
    resource: 'Q1-Report.pdf',
    status: 'success',
    details: 'Uploaded file to shared drive',
    ip: '192.168.1.100',
  },
  {
    id: '3',
    timestamp: '2024-01-16 14:20:45',
    user: 'hr@blinkequity.ca',
    action: 'USER_UPDATE',
    resource: 'jane.smith@blinkequity.ca',
    status: 'success',
    details: 'Updated employee department',
    ip: '192.168.1.101',
  },
  {
    id: '4',
    timestamp: '2024-01-16 14:15:30',
    user: 'admin@blinkequity.ca',
    action: 'DRIVE_ACCESS',
    resource: 'Engineering Folder',
    status: 'failed',
    details: 'Permission denied',
    ip: '192.168.1.100',
  },
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedAction, setSelectedAction] = useState('all');

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'USER_CREATE': return '👤';
      case 'USER_UPDATE': return '✏️';
      case 'USER_SUSPEND': return '🚫';
      case 'FILE_UPLOAD': return '📤';
      case 'FILE_DELETE': return '🗑️';
      case 'DRIVE_ACCESS': return '📁';
      default: return '📝';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportLogs = () => {
    // Handle export logic
    console.log('Exporting logs...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">Monitor all system activities and changes</p>
        </div>
        <Button onClick={exportLogs} variant="outline">
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter audit logs by date, action, or user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Action Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="USER_CREATE">User Creation</option>
                <option value="USER_UPDATE">User Updates</option>
                <option value="USER_SUSPEND">User Suspension</option>
                <option value="FILE_UPLOAD">File Upload</option>
                <option value="DRIVE_ACCESS">Drive Access</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            {filteredLogs.length} log entries found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{log.user}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{getActionIcon(log.action)}</span>
                      <span className="capitalize">
                        {log.action.toLowerCase().replace('_', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={log.resource}>
                      {log.resource}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate" title={log.details}>
                      {log.details}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs">{log.ip}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">📊</div>
              <div>
                <div className="text-2xl font-bold">{auditLogs.length}</div>
                <div className="text-sm text-muted-foreground">Total Logs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <div className="text-2xl font-bold">
                  {auditLogs.filter(log => log.status === 'success').length}
                </div>
                <div className="text-sm text-muted-foreground">Successful</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">❌</div>
              <div>
                <div className="text-2xl font-bold">
                  {auditLogs.filter(log => log.status === 'failed').length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}