
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});
