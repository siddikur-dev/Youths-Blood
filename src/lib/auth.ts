// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo authentication - Replace with your actual authentication
        if (credentials?.email === "user@youthblood.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "John Doe",
            email: "user@youthblood.com",
            bloodType: "B+",
            role: "user"
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.bloodType = user.bloodType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        session.user.bloodType = token.bloodType as string;
      }
      return session;
    }
  }
};