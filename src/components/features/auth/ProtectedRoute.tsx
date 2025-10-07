'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackPath = "/login" 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the attempted URL for redirecting after login
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`${fallbackPath}?callbackUrl=${callbackUrl}`);
    }
    
    if (!isLoading && isAuthenticated && requiredRole && userRole !== requiredRole) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, isLoading, userRole, requiredRole, router, pathname, fallbackPath]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Access Denied</div>
          <p className="text-gray-600 dark:text-gray-400">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}