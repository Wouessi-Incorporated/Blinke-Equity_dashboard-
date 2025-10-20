'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEmployees, useSuspendEmployee } from "@/hooks/useEmployees";

export default function SuspendEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const { data: employees = [], isLoading } = useEmployees();
  const suspendEmployeeMutation = useSuspendEmployee();

  const employee = employees.find((emp: { id: string; }) => emp.id === employeeId);

  const handleSuspend = async () => {
    if (!employee) return;
    
    try {
      await suspendEmployeeMutation.mutateAsync(employeeId);
      router.push('/dashboard/employees');
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  if (isLoading) {
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
            <p className="text-muted-foreground">Loading employee details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/employees">
              ← Back to Employees
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Employee Not Found</h1>
            <p className="text-muted-foreground">The requested employee could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  if (employee.status === 'suspended') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/employees/${employeeId}`}>
              ← Back to Employee
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Employee Already Suspended</h1>
            <p className="text-muted-foreground">This employee is already suspended.</p>
          </div>
        </div>
      </div>
    );
  }

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
            You are about to suspend {employee.firstName} {employee.lastName}. This will revoke their access to company resources in Google Workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Employee Details</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Name:</strong> {employee.firstName} {employee.lastName}</div>
              <div><strong>Email:</strong> {employee.email}</div>
              <div><strong>Department:</strong> {employee.department}</div>
              <div><strong>Job Title:</strong> {employee.jobTitle}</div>
              <div><strong>Status:</strong> <span className="text-green-600">Active</span></div>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-destructive">Google Workspace Actions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Suspend Google Workspace account (immediate access revocation)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Move to Inactive organizational unit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Revoke access to shared drives</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span>Sign out all active sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Maintain email forwarding to contractor@blinkequity.ca</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Maintain calendar sharing with contractor@blinkequity.ca</span>
              </div>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <h3 className="font-semibold text-destructive mb-2">Important Notice</h3>
            <p className="text-sm text-destructive">
              This action cannot be undone automatically. The employee will immediately lose access to all Google Workspace services. Their data will be preserved but inaccessible to them.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button 
              variant="destructive" 
              onClick={handleSuspend}
              disabled={suspendEmployeeMutation.isPending}
              className="min-w-32"
            >
              {suspendEmployeeMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Suspending...
                </>
              ) : (
                'Confirm Suspend'
              )}
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