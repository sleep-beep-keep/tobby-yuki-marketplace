'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';
import styles from './Nav.module.css';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';

export default function Nav() {
  const { itemCount } = useCart();
  const { profile, openProfile, isLoggedIn } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.announcementBar}>
        <span>Free Shipping on All Orders</span>
        <span className={styles.divider}>·</span>
        <span>Get 10% Off Your First Purchase! Use Code: NEWPET</span>
      </div>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Home">
            <Image
              src="/logo.png"
              alt="Tobby & Yuki"
              width={130}
              height={130}
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

            <button className={styles.actionBtn} aria-label="Search"><Search size={20} /></button>
            <button className={styles.actionBtn} onClick={openProfile} aria-label="Profile">
              <User size={20} />
            </button>
            <button className={styles.actionBtn} aria-label="Wishlist"><Heart size={20} /></button>
            <Link href="/cart" className={styles.actionBtn} aria-label="Cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
