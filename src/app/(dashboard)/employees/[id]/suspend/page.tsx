'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SuspendEmployeePage() {
  const params = useParams();
  const employeeId = params.id as string;

  // Mock employee data - will be replaced with API call
  const employee = {
    id: employeeId,
    name: 'John Doe',
    email: 'john.doe@blinkequity.ca',
    department: 'Engineering',
  };

  const handleSuspend = () => {
    // Handle suspend logic
    console.log('Suspending employee:', employeeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/employees/${employeeId}`}>
            ← Back to Employee
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Suspend Employee</h1>
          <p className="text-muted-foreground">Offboard team member and revoke access</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Confirm Suspension</CardTitle>
          <CardDescription>
            You are about to suspend {employee.name}. This will revoke their access to company resources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Employee Details</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Name:</strong> {employee.name}</div>
              <div><strong>Email:</strong> {employee.email}</div>
              <div><strong>Department:</strong> {employee.department}</div>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-destructive">Actions That Will Be Taken</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Revoke Google Workspace email access</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Remove access to shared drives</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Maintain mailbox delegation to contractor@blinkequity.ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Maintain calendar sharing with contractor@blinkequity.ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Reset account password</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Sign out all active sessions</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="destructive" onClick={handleSuspend}>
              Confirm Suspend
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/employees/${employeeId}`}>
                Cancel
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}