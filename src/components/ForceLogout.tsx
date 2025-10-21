'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { resetSession } from '@/lib/auth/session-reset';

export default function ForceLogout() {
  const handleForceLogout = async () => {
    // Clear all session data first
    resetSession();
    
    // Then sign out
    await signOut({ 
      callbackUrl: '/login?force=true',
      redirect: true 
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={handleForceLogout}
        variant="destructive"
        size="sm"
      >
        Reset Session
      </Button>
    </div>
  );
}