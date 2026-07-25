'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  return (
    <div className={styles.card} onClick={() => onClick(product)}>
      <div className={styles.imgWrap}>
        <Image src={product.img} alt={product.name} fill style={{ objectFit: 'contain' }} sizes="(max-width:768px) 50vw, 25vw" />
        {product.badge && <div className={`${styles.badge} ${product.badge === 'New' ? styles.badgeNew : ''}`}>{product.badge}</div>}
      </div>
      <div className={styles.info}>
        <div className={styles.sub}>{product.sub}</div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.desc}>{product.desc.slice(0, 72)}…</div>
        <div className={styles.footer}>
          <div className={styles.price}>₹{product.price.toLocaleString('en-IN')}</div>
          <button className={styles.addBtn} onClick={e => { e.stopPropagation(); addToCart(product); }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}
