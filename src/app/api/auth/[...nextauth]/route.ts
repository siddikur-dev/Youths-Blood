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
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          console.log('Attempting login for:', credentials.email);

          // শুধু main login API use করুন (এখন bcrypt কাজ করবে)
          const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
          });

          console.log('Login response status:', res.status);

          if (!res.ok) {
            console.log('Login failed with status:', res.status);
            return null;
          }

          const data = await res.json();
          console.log('Login response data:', data);

          if (data.success && data.user) {
            return {
              id: data.user._id || data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role || 'user',
              bloodGroup: data.user.bloodGroup || ''
            };
          }
          
          console.log('Login failed - no user data');
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
    maxAge: 30 * 24 * 60 * 60,
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
    signIn: '/auth/login',
    signUp: '/auth/register'
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };