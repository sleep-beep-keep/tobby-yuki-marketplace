'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ConfirmationPage() {
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <CheckCircle size={48} className={styles.icon} />
          <h1 className={styles.title}>Thank you for your order!</h1>
          <p className={styles.subtitle}>Your order has been placed successfully.</p>
        </div>

        <div className={styles.orderDetails}>
          <div className={styles.detailItem}>
            <span>Order Number</span>
            <strong>#{orderNumber}</strong>
          </div>
          <div className={styles.detailItem}>
            <span>Date</span>
            <strong>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
          </div>
          <div className={styles.detailItem}>
            <span>Payment Method</span>
            <strong>Prepaid</strong>
          </div>
        </div>

        <div className={styles.shippingInfo}>
          <h2 className={styles.sectionTitle}>Shipping to</h2>
          <p>Rahul Sharma<br/>
          Flat 101, Adventure Apartments, Street Name<br/>
          Koregaon Park, Pune, Maharashtra, 411001<br/>
          India</p>
        </div>

        <p className={styles.footerText}>You will receive an email confirmation shortly.</p>

        <Link href="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );
}