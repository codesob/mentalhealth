import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)'
    }}>
      <nav style={{
        background: '#fff',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/">
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600,
              color: '#4f8cff',
              cursor: 'pointer'
            }}>
              MeHeal
            </span>
          </Link>
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <Link href="/chat">
              <span style={{
                color: isActive('/chat') ? '#4f8cff' : '#666',
                fontWeight: isActive('/chat') ? 600 : 400,
                cursor: 'pointer'
              }}>
                Chat
              </span>
            </Link>
            <Link href="/therapy">
              <span style={{
                color: isActive('/therapy') ? '#4f8cff' : '#666',
                fontWeight: isActive('/therapy') ? 600 : 400,
                cursor: 'pointer'
              }}>
                Therapy
              </span>
            </Link>
            <Link href="/login">
              <button style={{
                background: '#4f8cff',
                color: '#fff',
                padding: '0.5rem 1.5rem',
                borderRadius: '2rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500
              }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem',
        minHeight: 'calc(100vh - 70px)'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
