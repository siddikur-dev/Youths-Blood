// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // আপনার backend API-তে লগিন ভেরিফাই করুন
          const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          if (data.success && data.user) {
            return {
              id: data.user._id, // MongoDB _id
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              bloodGroup: data.user.bloodGroup
            };
          }
          
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.bloodGroup = user.bloodGroup;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.bloodGroup = token.bloodGroup as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
});

export { handler as GET, handler as POST };