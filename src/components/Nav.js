'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';
import styles from './Nav.module.css';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';

export default function Nav() {
  const { itemCount } = useCart();
  const { openProfile } = useProfile();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.announcementBar}>
        <span>Verified B2B Supply Partner</span>
        <span className={styles.divider}>·</span>
        <span>Wholesale & Bulk Orders Across India</span>
      </div>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Home">
            <Image
              src="/logo.png"
              alt="Tobby & Yuki"
              width={180}
              height={180}
              className={styles.logoImage}
              priority
            />
          </Link>

          <div className={styles.navActions}>
            <div className={styles.hamburgerMenu}>
              <button className={styles.actionBtn} aria-label="Menu"><Menu size={24} /></button>
              <div className={styles.dropdownMenu}>
                <Link href="/products?pet=dogs">Shop Dogs</Link>
                <Link href="/products?pet=cats">Shop Cats</Link>
                <Link href="/products">All Collections</Link>
                <Link href="/about">Our Story</Link>
              </div>
            </div>

            <button className={styles.actionBtn} onClick={openProfile} aria-label="Dealer Portal Login">
              <User size={20} /> <span className={styles.actionText}>Dealer Login</span>
            </button>
            <Link href="/cart" className={styles.actionBtn} aria-label="Cart">
              <ShoppingBag size={20} /> <span className={styles.actionText}>Request Quote</span>
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
