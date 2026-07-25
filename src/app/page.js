'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import LoginModal from '@/components/LoginModal';
import ProfileModal from '@/components/ProfileModal';
import { useProfile } from '@/context/ProfileContext';
import styles from './page.module.css';

export default function Home() {
  const [modal, setModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { loginOpen, profileOpen, closeLogin, closeProfile, profile, saveProfile, logout } = useProfile();

  const trendingProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return PRODUCTS.slice(0, 8);
    }
    return PRODUCTS.filter(p => p.sub === activeFilter);
  }, [activeFilter]);

  const categories = ['Harnesses', 'Accessories', 'Combos'];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBadge}>⭐ Rated 4.9/5 by Pet Parents</div>
        <h1 className={styles.heroTitle}>Built for Adventure. Designed for Comfort.</h1>
        <p className={styles.heroSubtitle}>
          Premium gear crafted for India's terrain, weather, and the bold pets who own the streets.
        </p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </section>

      <section className={styles.valueProps}>
        <div className={styles.prop}>
          <span className={styles.propIcon}>🚚</span> {/* Replace with a proper icon component if available */}
          <div>
            <div className={styles.propTitle}>Free Delivery</div>
            <div className={styles.propText}>On all orders over ₹999</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>⚡️</span>
          <div>
            <div className={styles.propTitle}>Quick Dispatch</div>
            <div className={styles.propText}>Ships within 24-48 hours</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>🌿</span>
          <div>
            <div className={styles.propTitle}>Safe & Non-Toxic</div>
            <div className={styles.propText}>Pet-friendly materials</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>✅</span>
          <div>
            <div className={styles.propTitle}>Satisfaction Guarantee</div>
            <div className={styles.propText}>30-day return policy</div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link href="/products?sub=Harnesses" className={styles.categoryCard}>
            <Image src="/images/p1-kh-dog-harness.jpg" alt="Harnesses" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={styles.categoryName}>Harnesses</div>
          </Link>
          <Link href="/products?sub=Accessories" className={styles.categoryCard}>
            <Image src="/images/p4-cat-collar-bells.jpg" alt="Accessories" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={styles.categoryName}>Accessories</div>
          </Link>
          <Link href="/products?sub=Combos" className={styles.categoryCard}>
            <Image src="/images/p3-combo-camo.jpg" alt="Combos" fill style={{objectFit:'cover'}} sizes="(max-width: 768px) 100vw, 33vw" />
            <div className={styles.categoryName}>Combos</div>
          </Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightBg}`}>
        <h2 className={styles.sectionTitle}>Our Trending Products</h2>
        <div className={styles.filterTabs}>
          <button className={activeFilter === 'all' ? styles.activeTab : ''} onClick={() => setActiveFilter('all')}>All</button>
          {categories.map(cat => (
            <button key={cat} className={activeFilter === cat ? styles.activeTab : ''} onClick={() => setActiveFilter(cat)}>{cat}</button>
          ))}
        </div>
        <div className={styles.productsGrid}>
          {trendingProducts.map(p => <ProductCard key={`${activeFilter}-${p.id}`} product={p} onClick={setModal} />)}
        </div>
        <div className={styles.viewAll}>
          <Link href="/products" className="btn-secondary">View All Products</Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.splitSection}`}>
        <div className={styles.splitImage}>
          <Image src="/images/p5-dragon-neon.jpg" alt="Dragon Wing Harness" fill style={{objectFit:'cover'}} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div className={styles.splitContent}>
          <h3 className={styles.splitTitle}>The Adventure Series</h3>
          <p className={styles.splitText}>Engineered for durability and comfort, our Adventure Series is tested in the toughest Indian conditions. Perfect for the pet that's always ready for the next escapade.</p>
          <ul className={styles.splitList}>
            <li>✓ Military-grade webbing</li>
            <li>✓ All-weather padded plates</li>
            <li>✓ Reflective stitching for safety</li>
          </ul>
          <Link href="/products?sub=Harnesses" className="btn-outline">Shop Harnesses</Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.splitSection} ${styles.splitReverse}`}>
        <div className={styles.splitImage}>
          <Image src="/images/p6-combo-knight.jpg" alt="5-in-1 Combo Set" fill style={{objectFit:'cover'}} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div className={styles.splitContent}>
          <h3 className={styles.splitTitle}>Complete Combo Sets</h3>
          <p className={styles.splitText}>Get the full matching set for a polished look. Our 5-in-1 combos include a harness, leash, collar, poop bag holder, and a stylish ID tag.</p>
          <ul className={styles.splitList}>
            <li>✓ Perfect for gifting</li>
            <li>✓ Save on individual items</li>
            <li>✓ Unique, head-turning designs</li>
          </ul>
          <Link href="/products?sub=Combos" className="btn-outline">Shop Combos</Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stories from the Pack</h2>
        <div className={styles.testimonialsGrid}>
          {/* Placeholder Testimonials */}
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"The KH Harness is a game-changer! So sturdy and fits my Indie perfectly. No more pulling on our walks."</p>
            <div className={styles.author}>- Priya S., Mumbai</div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"My cat actually enjoys his walks now with the butterfly harness. It's so light and he can't wriggle out of it."</p>
            <div className={styles.author}>- Ankit G., Bangalore</div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"Love the Dragon Wing harness! We get so many compliments, and the quality is top-notch. Worth every rupee."</p>
            <div className={styles.author}>- Meera K., Delhi</div>
          </div>
        </div>
      </section>

      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
      {loginOpen && <LoginModal onClose={closeLogin} onSaveProfile={saveProfile} />}
      {profileOpen && <ProfileModal profile={profile} onClose={closeProfile} onLogout={logout} />}
    </>
  );
}
