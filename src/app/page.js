'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, BEST_SELLER_IDS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import LoginModal from '@/components/LoginModal';
import ProfileModal from '@/components/ProfileModal';
import { useProfile } from '@/context/ProfileContext';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  const [modal, setModal] = useState(null);
  const { loginOpen, profileOpen, closeLogin, closeProfile, profile, saveProfile, logout } = useProfile();
  const bestSellers = PRODUCTS.filter(p => BEST_SELLER_IDS.includes(p.id));

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>India's Premium Pet Lifestyle Brand</div>
          <h1 className={styles.h1}>Built for <em>Adventure.</em><br/>Designed for Comfort.</h1>
          <p className={styles.heroSub}>Gear crafted for India's terrain, weather, and the dogs and cats who own the streets.</p>
          <div className={styles.heroBtns}>
            <Link href="/products?pet=dogs"><button className="btn-primary">Shop Dogs</button></Link>
            <Link href="/products?pet=cats"><button className="btn-ghost">Shop Cats</button></Link>
          </div>
        </div>
        <div className={styles.heroImg}>
          <Image src="/logo.png" alt="Tobby & Yuki" fill style={{ objectFit:'contain' }} priority sizes="420px" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Categories</h2>
        <div className={styles.catsGrid}>
          {[['Harnesses','🦺'],['Accessories','🎒'],['Combos','🎁']].map(([name, icon]) => (
            <Link href={`/products?sub=${name}`} key={name} className={styles.catCard}>
              <div className={styles.catIcon}>{icon}</div>
              <div className={styles.catName}>{name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className={`${styles.section} ${styles.whiteBg}`}>
        <h2 className={styles.sectionTitle}>Best Sellers</h2>
        <div className={styles.productsGrid}>
          {bestSellers.map(p => <ProductCard key={p.id} product={p} onClick={setModal} />)}
        </div>
      </section>

      {/* COLLECTION BANNER */}
      <section className={styles.bannerWrap}>
        <Link href="/products" className={styles.banner}>
          <div>
            <div className={styles.bannerLabel}>New Collection</div>
            <div className={styles.bannerTitle}>Dragon Wing &<br/>Adventure Series</div>
            <button className="btn-ghost">Explore Collection</button>
          </div>
          <div className={styles.bannerImg}>
            <Image src="/images/banner.jpg" alt="Dragon Wing Harness" fill style={{objectFit:'contain'}} sizes="300px"/>
          </div>
        </Link>
      </section>

      {/* WHY T&Y */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Tobby & Yuki</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyImg}>
            <Image src="/images/why-dog.jpg" alt="Happy dog in harness" fill style={{objectFit:'contain'}} sizes="500px"/>
          </div>
          <div className={styles.whyPoints}>
            {[
              ['🛠️','Utility-Driven Design','Every product is engineered for a job — monsoon walks, hill treks, city commutes.'],
              ['🌿','Durable & Comfortable','Mil-spec webbing, breathable padding, and stress-tested hardware. Built to outlast 10,000 walks.'],
              ['🇮🇳','Made for Indian Conditions','Tested in Pune humidity, Mumbai monsoons, and Himachal snow.'],
              ['🐾','Vet-Approved Design','Reviewed by Indian veterinarians who understand local breed needs and climates.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className={styles.whyPoint}>
                <div className={styles.whyIcon}>{icon}</div>
                <div><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className={styles.newsletter}>
        <div><h4>Stay in the Pack</h4><p>New arrivals, care tips, and exclusive drops. No spam.</p></div>
        <div className={styles.nlForm}>
          <input className={styles.nlInput} type="email" placeholder="your@email.com"/>
          <button className="btn-primary" style={{whiteSpace:'nowrap'}}>Subscribe</button>
        </div>
      </div>

      <Footer />
      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
      {loginOpen && <LoginModal onClose={closeLogin} onSaveProfile={saveProfile} />}
      {profileOpen && <ProfileModal profile={profile} onClose={closeProfile} onLogout={logout} />}
    </>
  );
}
