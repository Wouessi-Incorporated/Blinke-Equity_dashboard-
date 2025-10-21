'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    Users,
    FolderOpen,
    FileText,
    Settings,
    LogOut,
    Bug,
    Calendar,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
    {
        title: "Main",
        items: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Employees",
                href: "/employees",
                icon: Users,
            },
            {
                title: "Shared Drive",
                href: "/shared-drive",
                icon: FolderOpen,
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Audit Logs",
                href: "/audit.logs",
                icon: FileText,
            },
            {
                title: "Settings",
                href: "/settings",
                icon: Settings,
            },
        ],
    },
    {
        title: "Tools",
        items: [
            {
                title: "Debug",
                href: "/debug",
                icon: Bug,
            },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Brinkly Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Employee Management
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                {navigationItems.map((section) => (
                    <div key={section.title} className="mb-6">
                        <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {section.title}
                        </div>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/dashboard' && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200",
                                            isActive
                                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-300"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                            {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email || 'user@example.com'}
                        </p>
                    </div>
                </div>

                <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}