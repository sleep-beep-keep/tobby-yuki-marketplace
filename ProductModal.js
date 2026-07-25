'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus } from 'lucide-react';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0] || product.img);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}><X size={24} /></button>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image src={activeImage} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="50vw" />
          </div>
          <div className={styles.thumbnailGrid}>
            {product.images.slice(0, 5).map((imgSrc, i) => (
              <div key={i} className={`${styles.thumbnail} ${activeImage === imgSrc ? styles.activeThumbnail : ''}`} onClick={() => setActiveImage(imgSrc)}>
                <Image src={imgSrc} alt={`${product.name} thumbnail ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="10vw" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.details}>
          <p className={styles.subCategory}>{product.sub}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>
          <p className={styles.description}>{product.desc}</p>

          <div className={styles.quantitySelector}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus size={16} /></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
          </div>

          <button className={styles.addToCartButton} onClick={handleAddToCart}>
            Add to Cart - ₹{(product.price * quantity).toLocaleString('en-IN')}
          </button>

          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>Features</h3>
            <ul>
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}