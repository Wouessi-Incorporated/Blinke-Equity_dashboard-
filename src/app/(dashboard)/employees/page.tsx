/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEmployees } from "@/hooks/useEmployees";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

export default function EmployeesPage() {
  const { data: employees = [], isLoading, error, refetch } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter((employee: { firstName: string; lastName: string; email: string; department: string; }) =>
    employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Manage your team members and their access</p>
          </div>
          <Button asChild>
            <Link href="/employees/add">
              Add Employee
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading employees from Google Workspace...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Manage your team members and their access</p>
          </div>
          <Button asChild>
            <Link href="/employees/add">
              Add Employee
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-destructive">
              Error loading employees: {error.message}
            </div>
            <div className="text-center mt-4">
              <Button onClick={() => refetch()} variant="outline">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground">
            {filteredEmployees.length} of {employees.length} employees in Google Workspace
          </p>
        </div>
        <Button asChild>
          <Link href="/employees/add">
            Add Employee
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            View and manage all employees in your Google Workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search employees by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button 
              variant="outline" 
              onClick={() => refetch()}
            >
              Refresh
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee: { id: Key | null | undefined; firstName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; lastName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: string; department: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; jobTitle: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; joinDate: string; }) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(employee.status)}>
                      {employee.status === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.jobTitle}</TableCell>
                  <TableCell>
                    {formatDate(employee.joinDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/employees/${employee.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/employees/${employee.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {employee.status === 'active' && (
                          <DropdownMenuItem asChild>
                            <Link href={`/employees/${employee.id}/suspend`}>
                              Suspend
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/employees/${employee.id}/delegate`}>
                            Assign Assistant
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {employees.length === 0 
                ? 'No employees found in Google Workspace. Add your first employee!' 
                : 'No employees match your search.'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}