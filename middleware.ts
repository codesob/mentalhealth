import { withAuth } from 'next-auth/middleware';

// Runs at the edge before a request reaches the page. Anyone without a valid
// NextAuth session token is redirected to /login (with ?callbackUrl=<original path>),
// so protected pages never render for anonymous visitors.
export default withAuth({
  pages: { signIn: '/login' },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ['/mood-tracker/:path*', '/chat/:path*'],
};
