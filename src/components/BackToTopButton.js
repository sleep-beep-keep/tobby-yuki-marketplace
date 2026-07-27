'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';
import styles from './BackToTopButton.module.css';
import { Menu, ArrowUp, X } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openProfile } = useProfile();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const scrollToTopAndClose = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    openProfile();
  };

  return (
    <>
      <button className={`${styles.button} ${isVisible ? styles.visible : ''}`} onClick={() => setIsMenuOpen(true)}>
        <Menu size={18} />
        <span>Quick Menu</span>
      </button>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div>
                <h3 className={styles.drawerTitle}>Quick Navigation</h3>
                <span className={styles.drawerBadge}>Wholesale Portal</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
            </div>
            <nav className={styles.navList}>
              <button className={`${styles.navLink} ${styles.primaryAction}`} onClick={scrollToTopAndClose}>
                <ArrowUp size={16} /> Back to Top
              </button>
              <a href="#categories" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Bulk Categories & Products</a>
              <Link href="/cart" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Request Wholesale Quote</Link>
              <a href="/Tobby_Yuki_Catalog.pdf" download className={styles.navLink}>Download Commercial Catalog (PDF)</a>
              <button className={styles.navLink} onClick={handleLoginClick}>Merchant Account Login / Register</button>
            </nav>
            <div className={styles.drawerFooter}>
              <p>B2B Support: <a href="mailto:sales@tobbyandyuki.com">sales@tobbyandyuki.com</a></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}