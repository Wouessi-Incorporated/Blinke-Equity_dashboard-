'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useEmployees, useUpdateEmployee, useUpdateEmail } from "@/hooks/useEmployees";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const { data: employees = [], isLoading } = useEmployees();
  const updateEmployeeMutation = useUpdateEmployee();
  const updateEmailMutation = useUpdateEmail();

  const employee = employees.find((emp: { id: string; }) => emp.id === employeeId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    jobTitle: '',
    phone: '',
  });

  const [newEmail, setNewEmail] = useState('');

  // Initialize form when employee data is loaded
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        department: employee.department || '',
        jobTitle: employee.jobTitle || '',
        phone: employee.phone || '',
      });
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employee) return;
    
    try {
      await updateEmployeeMutation.mutateAsync({
        id: employeeId,
        data: formData
      });
      router.push(`/dashboard/employees/${employeeId}`);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleEmailUpdate = async () => {
    if (!newEmail.trim() || !employee) return;
    
    try {
      await updateEmailMutation.mutateAsync({
        id: employeeId,
        newEmail
      });
      setNewEmail('');
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
            <h1 className="text-3xl font-bold">Edit Employee</h1>
            <p className="text-muted-foreground">Loading employee details from Google Workspace...</p>
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
            <p className="text-muted-foreground">The requested employee could not be found in Google Workspace.</p>
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
          <h1 className="text-3xl font-bold">Edit Employee</h1>
          <p className="text-muted-foreground">Update employee information in Google Workspace</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Update the employee&apos;s personal and professional details in Google Workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  disabled={updateEmployeeMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  disabled={updateEmployeeMutation.isPending}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  disabled={updateEmployeeMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  disabled={updateEmployeeMutation.isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                disabled={updateEmployeeMutation.isPending}
                placeholder="+1-555-0123"
              />
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                disabled={updateEmployeeMutation.isPending}
                className="min-w-32"
              >
                {updateEmployeeMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update Information'
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/dashboard/employees/${employeeId}`}>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Email Update Section */}
      <Card>
        <CardHeader>
          <CardTitle>Email Management</CardTitle>
          <CardDescription>
            Add email aliases to the employee&apos;s Google Workspace account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentEmail">Current Primary Email</Label>
            <Input
              id="currentEmail"
              value={employee.email}
              disabled
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newEmail">Add Email Alias</Label>
            <Input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new.username@blinkequity.ca"
              disabled={updateEmailMutation.isPending}
            />
            <p className="text-sm text-muted-foreground">
              This will add the new email as an alias to the existing Google Workspace account. The employee will receive emails at both addresses.
            </p>
          </div>
          <Button 
            onClick={handleEmailUpdate} 
            variant="outline"
            disabled={!newEmail.trim() || updateEmailMutation.isPending}
            className="min-w-32"
          >
            {updateEmailMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Adding...
              </>
            ) : (
              'Add Email Alias'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}