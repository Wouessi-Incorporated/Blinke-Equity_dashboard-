'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();
  
  // Safe session access
  const safeSession = session || { user: null, accessToken: null, error: null };
  const safeUser = safeSession.user || { id: null, role: null };

  const signInWithGoogle = (callbackUrl: string = "/dashboard") => {
    return signIn("google", { callbackUrl });
  };

  const signOutAndRedirect = (callbackUrl: string = "/") => {
    // Clear storage before sign out
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    return signOut({ callbackUrl });
  };

  return {
    // Session data with safe defaults
    user: safeUser,
    session: safeSession,
    status,
    
    // State helpers
    isAuthenticated: !!safeSession.user,
    isLoading: status === "loading",
    hasError: !!safeSession.error,
    
    // Auth methods
    signIn: signInWithGoogle,
    signOut: signOutAndRedirect,
    updateSession: update,
    
    // User info with safe defaults
    userId: safeUser.id || '',
    userRole: safeUser.role || 'user',
    accessToken: safeSession.accessToken || '',
  };
}