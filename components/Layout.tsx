import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => router.pathname === path;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background shapes */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40%',
        height: '40%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '35%',
        height: '35%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <nav style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}>
                💜
              </div>
              <span style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MindHeal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <Link href="/chat">
              <span style={{
                color: isActive('/chat') ? '#667eea' : '#64748b',
                fontWeight: isActive('/chat') ? 600 : 500,
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 200ms',
                fontSize: '0.95rem',
                letterSpacing: '0.01em'
              }}>
                Chat
                {isActive('/chat') && (
                  <div style={{
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '2px'
                  }} />
                )}
              </span>
            </Link>
            <Link href="/therapy">
              <span style={{
                color: isActive('/therapy') ? '#667eea' : '#64748b',
                fontWeight: isActive('/therapy') ? 600 : 500,
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 200ms',
                fontSize: '0.95rem',
                letterSpacing: '0.01em'
              }}>
                Therapy
                {isActive('/therapy') && (
                  <div style={{
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '2px'
                  }} />
                )}
              </span>
            </Link>
            <Link href="/login">
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '0.625rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transform: 'translateY(0)',
                transition: 'all 200ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}>
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <div style={{ width: 24, height: 3, background: '#667eea', borderRadius: '2px', transition: 'all 300ms' }} />
            <div style={{ width: 24, height: 3, background: '#667eea', borderRadius: '2px', transition: 'all 300ms' }} />
            <div style={{ width: 24, height: 3, background: '#667eea', borderRadius: '2px', transition: 'all 300ms' }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <Link href="/chat">
              <div onClick={() => setMobileMenuOpen(false)} style={{
                padding: '0.75rem',
                color: isActive('/chat') ? '#667eea' : '#64748b',
                fontWeight: isActive('/chat') ? 600 : 500,
                cursor: 'pointer',
                borderRadius: '8px',
                background: isActive('/chat') ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
              }}>
                Chat
              </div>
            </Link>
            <Link href="/therapy">
              <div onClick={() => setMobileMenuOpen(false)} style={{
                padding: '0.75rem',
                color: isActive('/therapy') ? '#667eea' : '#64748b',
                fontWeight: isActive('/therapy') ? 600 : 500,
                cursor: 'pointer',
                borderRadius: '8px',
                background: isActive('/therapy') ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
              }}>
                Therapy
              </div>
            </Link>
            <Link href="/login">
              <button onClick={() => setMobileMenuOpen(false)} style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '0.875rem',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                Get Started
              </button>
            </Link>
          </div>
        )}
      </nav>

      <main style={{
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(2rem, 5vw, 3rem) 0',
        marginTop: 'clamp(2rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          color: 'white'
        }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', fontWeight: 600, marginBottom: '1rem' }}>
              MindHeal
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.8, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              Your mental health matters. Connect with caring professionals and supportive community.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1rem)', fontWeight: 600, marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              <Link href="/chat"><span style={{ opacity: 0.9, cursor: 'pointer' }}>Chat</span></Link>
              <Link href="/therapy"><span style={{ opacity: 0.9, cursor: 'pointer' }}>Find Therapist</span></Link>
              <Link href="/about"><span style={{ opacity: 0.9, cursor: 'pointer' }}>About Us</span></Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1rem)', fontWeight: 600, marginBottom: '1rem' }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              <span style={{ opacity: 0.9 }}>Crisis Hotline: 988</span>
              <span style={{ opacity: 0.9 }}>Email: support@mindheal.com</span>
              <span style={{ opacity: 0.9 }}>Available 24/7</span>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: 1280,
          margin: '2rem auto 0',
          padding: '0 1rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          color: 'white',
          opacity: 0.8,
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
        }}>
          <p>© 2024 MindHeal. All rights reserved. Your mental health journey starts here.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
