'use client';

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
    onMenuClick?: () => void;
}

const getPageTitle = (pathname: string): string => {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0 || segments[0] === 'dashboard') {
        return 'Dashboard';
    }

    const pageMap: Record<string, string> = {
        'employees': 'Employee Management',
        'shared-drive': 'Shared Drive',
        'audit.logs': 'Audit Logs',
        'settings': 'Settings',
        'debug': 'Debug Console',
    };

    const mainPage = segments[0];
    const subPage = segments[1];

    if (subPage === 'add') {
        return `Add ${pageMap[mainPage]?.replace(' Management', '') || 'Item'}`;
    }

    return pageMap[mainPage] || mainPage.charAt(0).toUpperCase() + mainPage.slice(1);
};

export function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname();
    const pageTitle = getPageTitle(pathname);

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMenuClick}
                        className="md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {pageTitle}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {pathname}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-10 w-64"
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                    </Button>
                </div>
            </div>
        </header>
    );
}