'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

interface SessionErrorBoundaryProps {
  children: React.ReactNode;
}

export default function SessionErrorBoundary({ children }: SessionErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('session') || 
          event.error?.message?.includes('undefined') ||
          event.error?.message?.includes('null')) {
        console.error('Session error detected:', event.error);
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleReset = async () => {
    // Clear all storage and sign out
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ callbackUrl: '/login', redirect: true });
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Session Error</h1>
          <p className="text-gray-600 mb-4">
            There was an issue with your session. Please log in again.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset & Log In Again
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}