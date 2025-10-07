import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom sign-in logic here
      // For example, restrict to certain email domains:
      // if (user.email?.endsWith('@yourcompany.com')) return true;
      return true;
    },
    
    async jwt({ token, account, user, profile }) {
      // Persist OAuth access_token to the token
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        
        // Add user role based on email or other criteria
        if (user?.email) {
          // Example: Make first user admin, others user
          token.role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
        }
      }
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      session.error = token.error as string;
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
  },
  
  debug: process.env.NODE_ENV === "development",
};