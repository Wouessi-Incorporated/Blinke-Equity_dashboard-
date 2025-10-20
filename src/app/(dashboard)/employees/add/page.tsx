'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useCreateEmployee } from "@/hooks/useEmployees";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
  const createEmployeeMutation = useCreateEmployee();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    jobTitle: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@blinkequity.ca')) {
      newErrors.email = 'Email must be @blinkequity.ca domain';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await createEmployeeMutation.mutateAsync(formData);
      router.push('/employees');
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href="/dashboard/employees">
            ← Back to Employees
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Employee</h1>
          <p className="text-muted-foreground">Onboard a new team member in Google Workspace</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>
            Enter the new employee&apos;s details. This will automatically create their Google Workspace account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={createEmployeeMutation.isPending}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={createEmployeeMutation.isPending}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="username@blinkequity.ca"
                required
                disabled={createEmployeeMutation.isPending}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email ? (
                <p className="text-sm text-destructive">{errors.email}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This will be their Google Workspace email address
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  disabled={createEmployeeMutation.isPending}
                  className={errors.jobTitle ? 'border-destructive' : ''}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-destructive">{errors.jobTitle}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  disabled={createEmployeeMutation.isPending}
                  className={errors.department ? 'border-destructive' : ''}
                />
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={createEmployeeMutation.isPending}
                placeholder="+1-555-0123"
              />
            </div>

            <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
              <h3 className="font-semibold">Automated Google Workspace Setup</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Create Google Workspace email account</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Grant access to shared drives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Setup email forwarding to contractor@blinkequity.ca</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Share calendar with contractor@blinkequity.ca</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Place in Active Employees organizational unit</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                disabled={createEmployeeMutation.isPending}
                className="min-w-32"
              >
                {createEmployeeMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create Employee'
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/employees">
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}