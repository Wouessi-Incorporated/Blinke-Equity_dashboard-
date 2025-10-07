import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const signInWithGoogle = (callbackUrl: string = "/dashboard") => {
    return signIn("google", { callbackUrl });
  };

  const signOutAndRedirect = (callbackUrl: string = "/") => {
    return signOut({ callbackUrl });
  };

  return {
    // Session data
    user: session?.user,
    session,
    status,
    
    // State helpers
    isAuthenticated: !!session,
    isLoading: status === "loading",
    hasError: !!session?.error,
    
    // Auth methods
    signIn: signInWithGoogle,
    signOut: signOutAndRedirect,
    updateSession: update,
    
    // User info
    userId: session?.user?.id,
    userRole: session?.user?.role,
    accessToken: session?.accessToken,
  };
}