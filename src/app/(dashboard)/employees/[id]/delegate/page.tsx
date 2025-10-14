'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DelegateAssistantPage() {
  const params = useParams();
  const employeeId = params.id as string;

  // Mock data - will be replaced with API calls
  const employee = {
    id: employeeId,
    name: 'John Doe',
    email: 'john.doe@blinkequity.ca',
  };

  const availableAssistants = [
    { id: '2', name: 'Jane Smith', email: 'jane.smith@blinkequity.ca' },
    { id: '3', name: 'Mike Johnson', email: 'mike.johnson@blinkequity.ca' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah.wilson@blinkequity.ca' },
  ];

  const [selectedAssistants, setSelectedAssistants] = useState<string[]>([]);

  const toggleAssistant = (assistantId: string) => {
    setSelectedAssistants(prev =>
      prev.includes(assistantId)
        ? prev.filter(id => id !== assistantId)
        : [...prev, assistantId]
    );
  };

  const handleAssign = () => {
    // Handle assignment logic
    console.log('Assigning assistants:', selectedAssistants);
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
          <h1 className="text-3xl font-bold">Assign Assistant</h1>
          <p className="text-muted-foreground">Delegate access for {employee.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assistant Assignment</CardTitle>
          <CardDescription>
            Select employees who should have assistant access to {employee.name}&apos;s resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Employee Details</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Name:</strong> {employee.name}</div>
              <div><strong>Email:</strong> {employee.email}</div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Available Assistants</Label>
            <div className="border rounded-lg divide-y">
              {availableAssistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className={`p-4 flex items-center space-x-4 cursor-pointer ${
                    selectedAssistants.includes(assistant.id) ? 'bg-accent' : ''
                  }`}
                  onClick={() => toggleAssistant(assistant.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedAssistants.includes(assistant.id)}
                    onChange={() => toggleAssistant(assistant.id)}
                    className="rounded"
                  />
                  <div>
                    <div className="font-medium">{assistant.name}</div>
                    <div className="text-sm text-muted-foreground">{assistant.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedAssistants.length > 0 && (
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Selected Assistants</h3>
              <div className="space-y-1">
                {selectedAssistants.map(assistantId => {
                  const assistant = availableAssistants.find(a => a.id === assistantId);
                  return (
                    <div key={assistantId} className="text-sm">
                      • {assistant?.name} ({assistant?.email})
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Permissions Granted</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Access to shared drive folders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Calendar management rights</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Email delegation capabilities</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleAssign} disabled={selectedAssistants.length === 0}>
              Assign Assistants
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