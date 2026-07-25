'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';
import styles from './Nav.module.css';

export default function Nav() {
  const { itemCount } = useCart();
  const { profile, openProfile, isLoggedIn } = useProfile();
  return (
    <nav className={styles.nav}>
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
      <ul className={styles.links}>
        <li><Link href="/products?pet=dogs">Dogs</Link></li>
        <li><Link href="/products?pet=cats">Cats</Link></li>
        <li><Link href="/products">Collections</Link></li>
      </ul>
      <div className={styles.actions}>
        <button className={styles.icon} aria-label="Search">🔍</button>
        <button className={styles.icon} type="button" onClick={openProfile} aria-label="Profile">
          {isLoggedIn ? '👤' : '🔐'}
        </button>
        <Link href="/cart" className={styles.icon} aria-label="Cart">
          🛒
          {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
