import type { ReactNode } from 'react';
import Providers from '../components/Providers';
import '../styles/globals.css';

// Root layout for the App Router. Pages still under /pages use _app.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
