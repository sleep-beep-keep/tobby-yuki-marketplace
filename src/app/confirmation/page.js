'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function ConfirmationPage() {
  const { cart, subtotal, clearCart } = useCart();
  const orderRef = useRef(`#TY-2026-${Math.floor(10000 + Math.random() * 89999)}`);
  const savedCart = useRef(cart.length > 0 ? [...cart] : []);
  const savedSubtotal = useRef(subtotal);

  useEffect(() => { clearCart(); }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>🎉</div>
      <h1 className={styles.title}>Order Placed!</h1>
      <p className={styles.sub}>Your pet's gear is on its way.<br/>You'll receive a confirmation email shortly.</p>

      <div className={styles.orderNum}>
        <div className={styles.orderLabel}>Order Reference</div>
        <div className={styles.orderVal}>{orderRef.current}</div>
      </div>

      <div className={styles.summary}>
        {savedCart.current.map(item => (
          <div key={item.id} className={styles.row}>
            <span className={styles.rowLabel}>{item.name} × {item.qty}</span>
            <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div className={styles.row}><span className={styles.rowLabel}>Shipping</span><span>₹89</span></div>
        <div className={styles.rowTotal}>
          <span>Total</span>
          <span>₹{(savedSubtotal.current + 89).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <Link href="/products"><button className="btn-cta">Continue Shopping</button></Link>
    </div>
  );
}
