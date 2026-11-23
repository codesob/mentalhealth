'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

const NAV_LINKS = [
  { href: '/mood-tracker', label: 'Mood tracker' },
  { href: '/ai-journal', label: 'Journal' },
  { href: '/ai-therapy', label: 'Assistant' },
  { href: '/chat', label: 'Community' },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `${styles.navLink} ${pathname === href ? styles.navLinkActive : ''}`;

  const accountActions = session ? (
    <button className="btn btn-secondary" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  ) : (
    <>
      <Link href="/login" className="btn btn-secondary">
        Sign in
      </Link>
      <Link href="/register" className="btn btn-primary">
        Create account
      </Link>
    </>
  );

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true" />
            MindHeal
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <div className={styles.actions}>{accountActions}</div>
          </nav>

          <button
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className={styles.mobileMenu} onClick={() => setMenuOpen(false)}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
            <div className={styles.actions} style={{ margin: '0.75rem 0 0' }}>
              {accountActions}
            </div>
          </div>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span>© {new Date().getFullYear()} MindHeal</span>
          <span>
            MindHeal is a self-help tool and does not replace professional care. If you are in
            immediate danger, contact your local emergency services.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
