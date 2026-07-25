'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const images = product?.images || [product?.img];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [product]);

  if (!product) return null;

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <div className={styles.imgWrap}>
          <Image src={selectedImage} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="400px" />
        </div>
        {images.length > 1 && (
          <div className={styles.thumbs}>
            {images.map(src => (
              <button
                key={src}
                className={`${styles.thumb} ${src === selectedImage ? styles.thumbActive : ''}`}
                type="button"
                onClick={() => setSelectedImage(src)}
              >
                <Image src={src} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="80px" />
              </button>
            ))}
          </div>
        )}
        <div className={styles.body}>
          <div className={styles.cat}>{product.sub} · {product.cat === 'dogs' ? 'Dogs' : 'Cats'}</div>
          <h2 className={styles.name}>{product.name}</h2>
          <div className={styles.price}>₹{product.price.toLocaleString('en-IN')}</div>
          <p className={styles.desc}>{product.desc}</p>
          <div className={styles.features}>
            {product.features.map(f => <div key={f} className={styles.feature}>{f}</div>)}
          </div>
          <button className={`btn-cta ${styles.addBtn}`} onClick={() => { addToCart(product); onClose(); }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
