import { SessionProvider } from "@/components/features/auth/SessionProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blinkle Dashboard",
  description: "Employee Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}