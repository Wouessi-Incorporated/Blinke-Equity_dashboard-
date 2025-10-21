import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { validateAuthEnvironment } from "./validate-env";

// Validate environment variables
validateAuthEnvironment();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.alias https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.settings.basic",
          prompt: "consent",
          access_type: "offline",
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',

  pages: {
    signIn: "/login",
  },
};