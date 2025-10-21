'use client';

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
      refetchWhenOffline={false}
    >
      {children}
    </NextAuthSessionProvider>
  );
}