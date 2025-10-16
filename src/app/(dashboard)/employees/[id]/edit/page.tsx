'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditEmployeePage() {
  const params = useParams();
  const employeeId = params.id as string;

  // Mock employee data - will be replaced with API call
  const [employee, setEmployee] = useState({
    id: employeeId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@blinkequity.ca',
    department: 'Engineering',
    jobTitle: 'Software Engineer',
    phone: '+1-555-0123',
  });

  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Update employee:', employee);
  };

  const handleEmailUpdate = () => {
    // Handle email update logic
    console.log('Update email to:', newEmail);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href={`/employees/${employeeId}`}>
            ← Back to Employee
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Employee</h1>
          <p className="text-muted-foreground">Update employee information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Update the employee&apos;s personal and professional details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={employee.firstName}
                  onChange={(e) => setEmployee({...employee, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={employee.lastName}
                  onChange={(e) => setEmployee({...employee, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={employee.jobTitle}
                  onChange={(e) => setEmployee({...employee, jobTitle: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={employee.department}
                  onChange={(e) => setEmployee({...employee, department: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={employee.phone}
                onChange={(e) => setEmployee({...employee, phone: e.target.value})}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit">Update Information</Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/employees/${employeeId}`}>
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
            Update the employee&apos;s email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentEmail">Current Email</Label>
            <Input
              id="currentEmail"
              value={employee.email}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newEmail">New Email Address</Label>
            <Input
              id="newEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new.username@blinkequity.ca"
            />
            <p className="text-sm text-muted-foreground">
              This will add the new email as an alias to the existing account
            </p>
          </div>
          <Button onClick={handleEmailUpdate} variant="outline">
            Update Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}