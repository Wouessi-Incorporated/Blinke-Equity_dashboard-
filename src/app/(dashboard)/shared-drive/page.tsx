'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data
const folders = [
  {
    id: '1',
    name: 'Company Documents',
    type: 'folder',
    size: '2.4 GB',
    modified: '2024-01-15',
    items: 156,
    shared: true,
  },
  {
    id: '2',
    name: 'HR Resources',
    type: 'folder',
    size: '1.2 GB',
    modified: '2024-01-14',
    items: 89,
    shared: true,
  },
  {
    id: '3',
    name: 'Engineering',
    type: 'folder',
    size: '4.7 GB',
    modified: '2024-01-16',
    items: 234,
    shared: true,
  },
];

const files = [
  {
    id: '4',
    name: 'Q1-Report.pdf',
    type: 'pdf',
    size: '24.5 MB',
    modified: '2024-01-15',
    owner: 'John Doe',
  },
  {
    id: '5',
    name: 'Employee-Handbook.docx',
    type: 'document',
    size: '3.2 MB',
    modified: '2024-01-14',
    owner: 'Jane Smith',
  },
  {
    id: '6',
    name: 'Company-Presentation.pptx',
    type: 'presentation',
    size: '15.7 MB',
    modified: '2024-01-13',
    owner: 'Mike Johnson',
  },
];

export default function SharedDrivePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return '📁';
      case 'pdf': return '📄';
      case 'document': return '📝';
      case 'presentation': return '📊';
      default: return '📎';
    }
  };

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (itemId: string) => {
    console.log('Sharing item:', itemId);
  };

  const handleDownload = (itemId: string) => {
    console.log('Downloading item:', itemId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shared Drive</h1>
          <p className="text-muted-foreground">Manage company files and folders</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/shared-drive/upload">
              Upload Files
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/shared-drive/create-folder">
              Create Folder
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📁</div>
              <div>
                <div className="text-2xl font-bold">{folders.length}</div>
                <div className="text-sm text-muted-foreground">Folders</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📄</div>
              <div>
                <div className="text-2xl font-bold">{files.length}</div>
                <div className="text-sm text-muted-foreground">Files</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">💾</div>
              <div>
                <div className="text-2xl font-bold">8.3 GB</div>
                <div className="text-sm text-muted-foreground">Used</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">👥</div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Shared</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Drive Contents</CardTitle>
          <CardDescription>
            Browse and manage files and folders in your shared drive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search files and folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Folders Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Folders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFolders.map((folder) => (
                <Card key={folder.id} className="cursor-pointer hover:bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getFileIcon(folder.type)}</div>
                        <div>
                          <div className="font-medium">{folder.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {folder.items} items • {folder.size}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">⋯</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleShare(folder.id)}>
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Modified: {folder.modified}
                      </Badge>
                      {folder.shared && (
                        <Badge variant="default" className="text-xs">
                          Shared
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Files Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Files</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{getFileIcon(file.type)}</span>
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {file.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.owner}</TableCell>
                    <TableCell>{file.modified}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(file.id)}
                        >
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(file.id)}
                        >
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}