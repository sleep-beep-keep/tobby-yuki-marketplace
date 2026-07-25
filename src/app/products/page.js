'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Footer from '@/components/Footer';
import styles from './page.module.css';

function ProductsContent() {
  const params = useSearchParams();
  const initPet = params.get('pet') || 'all';
  const initSub = params.get('sub') || '';

  const [pet, setPet] = useState(initPet);
  const [sub, setSub] = useState(initSub);
  const [modal, setModal] = useState(null);

  const filtered = PRODUCTS.filter(p => {
    if (pet !== 'all' && p.cat !== pet) return false;
    if (sub && p.sub !== sub) return false;
    return true;
  });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>Home / <span>Products</span></div>
        <h1 className={styles.title}>
          {pet === 'dogs' ? 'Dog Products' : pet === 'cats' ? 'Cat Products' : 'All Collections'}
        </h1>
      </div>

      <div className={styles.layout}>
        <aside className={styles.filters}>
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Pet</div>
            {['all','dogs','cats'].map(v => (
              <label key={v} className={styles.filterOpt}>
                <input type="radio" name="pet" checked={pet===v} onChange={() => setPet(v)} />
                {v === 'all' ? 'All' : v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>Category</div>
            {['Harnesses','Accessories','Combos'].map(v => (
              <label key={v} className={styles.filterOpt}>
                <input type="checkbox" checked={sub===v} onChange={() => setSub(sub===v ? '' : v)} />
                {v}
              </label>
            ))}
          </div>
        </aside>

        <div>
          <div className={styles.topBar}>
            <div className={styles.count}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</div>
            <div className={styles.tabs}>
              {['all','dogs','cats'].map(v => (
                <button key={v} className={`${styles.tab} ${pet===v ? styles.tabActive : ''}`} onClick={() => setPet(v)}>
                  {v === 'all' ? 'All' : v === 'dogs' ? '🐕 Dogs' : '🐱 Cats'}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onClick={setModal} />)}
            {filtered.length === 0 && <div className={styles.empty}>No products match your filters.</div>}
          </div>
        </div>
      </div>

      <Footer />
      {modal && <ProductModal product={modal} onClose={() => setModal(null)} />}
    </>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}
