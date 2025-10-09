'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function CreateFolderPage() {
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [isShared, setIsShared] = useState(true);

  const handleCreate = () => {
    // Handle folder creation logic
    console.log('Creating folder:', { folderName, description, isShared });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" asChild>
          <Link href="/dashboard/shared-drive">
            ← Back to Drive
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Folder</h1>
          <p className="text-muted-foreground">Create a new folder in shared drive</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Folder Details</CardTitle>
            <CardDescription>
              Enter the details for your new folder
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name *</Label>
              <Input
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="e.g., Project Documents"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of folder contents"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isShared"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="isShared">Share with all team members</Label>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleCreate} disabled={!folderName.trim()}>
                Create Folder
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/shared-drive">
                  Cancel
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Folder Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Default Access Levels</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Managers: Full access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Team Members: View & edit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>Others: No access</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Automated Features</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Automatic backup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Version history</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Access logging</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}