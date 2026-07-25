'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { profile, openProfile, isLoggedIn } = useProfile();
  return (
    <nav className={`${styles.nav} ${pathname === '/' ? styles.homePage : styles.innerPage}`}>
      <Link href="/" className={styles.logo} aria-label="Home">
        <Image
          src="/logo.png"
          alt="Tobby & Yuki"
          width={1024}
          height={1024}
          className={styles.logoImage}
          priority
        />
      </Link>
      <div className={styles.menu}>
        <button className={styles.menuButton} type="button" aria-label="Open menu" aria-haspopup="true">☰</button>
        <div className={styles.menuDropdown}>
          <button className={styles.menuItem} type="button">🔍 Search</button>
          <button className={styles.menuItem} type="button" onClick={openProfile}>
            {isLoggedIn ? '👤' : '🔐'} Profile
          </button>
          <Link href="/cart" className={styles.menuItem}>
            🛒 Cart {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
