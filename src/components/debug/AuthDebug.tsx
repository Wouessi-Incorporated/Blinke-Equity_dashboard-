'use client';

import { useSession } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthDebug() {
    const { data: session, status } = useSession();
    const auth = useAuth();

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md">
            <h3 className="font-bold mb-2">Auth Debug</h3>
            <div>Status: {status}</div>
            <div>Session: {session ? 'exists' : 'null'}</div>
            <div>User: {session?.user?.email || 'none'}</div>
            <div>Error: {session?.error || 'none'}</div>
            <div>Auth Hook Status: {auth.status}</div>
            <div>Is Authenticated: {auth.isAuthenticated ? 'yes' : 'no'}</div>
        </div>
    );
}