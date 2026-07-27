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
        <div className={styles.heroBadge}>⭐ Trusted Wholesale Supplier for 200+ Retailers & Clinics</div>
        <h1 className={styles.heroTitle}>Institutional Pet Gear Supply & Custom Wholesale Solutions.</h1>
        <p className={styles.heroSubtitle}>
          Direct-from-manufacturer supply chains, custom branding, scalable bulk margins, and reliable nationwide fulfillment for retailers, clinics, and distributors.
        </p>
        <div className={styles.heroActions}>
          <Link href="/wholesale" className="btn-primary">Apply for Merchant Account</Link>
          <a href="/Tobby_Yuki_Catalog.pdf" download className="btn-secondary">Download Commercial Catalog (PDF)</a>
        </div>
      </section>

      <section className={styles.valueProps}>
        <div className={styles.prop}>
          <span className={styles.propIcon}>📈</span>
          <div>
            <div className={styles.propTitle}>High Trade Margins</div>
            <div className={styles.propText}>Tiered Wholesale Pricing</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>📦</span>
          <div>
            <div className={styles.propTitle}>Low MOQs</div>
            <div className={styles.propText}>Flexible Batch Sizes</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>🧾</span>
          <div>
            <div className={styles.propTitle}>GST Invoicing</div>
            <div className={styles.propText}>Credit Terms Available</div>
          </div>
        </div>
        <div className={styles.prop}>
          <span className={styles.propIcon}>🚚</span>
          <div>
            <div className={styles.propTitle}>Express B2B Freight</div>
            <div className={styles.propText}>Reliable Nationwide Delivery</div>
          </div>
        </div>
      </section>

      <section id="categories" className={styles.section}>
        <h2 className={styles.sectionTitle}>Bulk Categories & Product Lines</h2>
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
        <div className={styles.splitContent}>
          <h3 className={styles.splitTitle}>Custom Branding & Private Label Solutions</h3>
          <p className={styles.splitText}>Need custom sizing, co-branded logo patches, or bulk retail-ready packaging? Partner with our production team for tailored order runs that meet your specific business needs.</p>
          <Link href="/wholesale" className="btn-outline">Schedule B2B Advisory Call</Link>
        </div>
        <div className={styles.splitImage}>
          <Image src="/images/p6-combo-knight.jpg" alt="Custom Branding" fill style={{objectFit:'cover'}} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialsSection}`}>
        <h2 className={styles.sectionTitle}>Trusted by Industry Leaders</h2>
        <div className={styles.testimonialsGrid}>
          {/* Placeholder Testimonials */}
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"Tobby & Yuki's harnesses are our top-selling item. The quality is unmatched and our customers love the designs. Their B2B support is excellent."</p>
            <div className={styles.author}>- Rajesh Sharma | Managing Partner, VetCare Chain, Mumbai</div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"Reliable supply and consistent product quality are crucial for us. Tobby & Yuki delivers on both fronts, with flexible MOQs that help our inventory management."</p>
            <div className={styles.author}>- Priya V. | Director, Retail Pet Outlets, Bangalore</div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
            <p className={styles.quote}>"We switched to Tobby & Yuki for our clinic's post-op and walking aids. The trade margins are great, and the products are vet-approved and trusted by our clients."</p>
            <div className={styles.author}>- Dr. Ankit G. | Head Veterinarian, Pawsitive Health, Delhi</div>
          </div>
        </div>
      </section>

      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
      {loginOpen && <LoginModal onClose={closeLogin} onSaveProfile={saveProfile} />}
      {profileOpen && <ProfileModal profile={profile} onClose={closeProfile} onLogout={logout} />}
    </>
  );
}
