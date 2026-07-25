'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper} onClick={() => onClick(product)}>
        <Image
          src={product.img}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.badge && <div className={styles.badge}>{product.badge}</div>}
        <button className={styles.wishlistBtn} aria-label="Add to wishlist" onClick={e => e.stopPropagation()}>
          <Heart size={18} />
        </button>
      </div>
      <div className={styles.info}>
        <div>
          <p className={styles.category}>{product.sub}</p>
          <h3 className={styles.name} onClick={() => onClick(product)}>{product.name}</h3>
          <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <button className={styles.addToCartBtn} onClick={e => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
      </div>
    </div>
  );
}
