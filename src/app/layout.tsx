import { SessionProvider } from "@/components/features/auth/SessionProvider";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import type { Metadata } from "next";
import ForceLogout from "@/components/ForceLogout";

import './globals.css'
import SessionErrorBoundary from "@/components/features/auth/SessionErrorBoundary";

export const metadata: Metadata = {
  title: "Brinkly Dashboard",
  description: "Employee Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ReactQueryProvider>
          <SessionProvider>
            {/* <SessionErrorBoundary> */}
            {/* <ForceLogout /> */}
            {children}
            {/* </SessionErrorBoundary> */}
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}