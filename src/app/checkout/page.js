'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutBar from '@/components/CheckoutBar';
import OrderSummary from '@/components/OrderSummary';
import styles from './page.module.css';

const DELIVERY_OPTS = [
  { label: 'Standard Delivery', sub: '4–6 business days · Tracking included', price: 89 },
  { label: 'Express Delivery', sub: '2 business days · Priority handling', price: 199 },
  { label: 'Same-Day (Pune only)', sub: 'Order before 12 PM · Delivered by 8 PM', price: 349 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [delivery, setDelivery] = useState(0);

  return (
    <>
      <CheckoutBar current={2} />
      <div className={styles.body}>
        <div>
          <h2 className={styles.heading}>Delivery Details</h2>

          <div className={styles.block}>
            <div className={styles.blockTitle}>Contact Information</div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label>First Name</label><input type="text" placeholder="Rahul"/></div>
              <div className={styles.formGroup}><label>Last Name</label><input type="text" placeholder="Sharma"/></div>
              <div className={styles.formGroup}><label>Email</label><input type="email" placeholder="rahul@email.com"/></div>
              <div className={styles.formGroup}><label>Phone</label><input type="tel" placeholder="+91 98765 43210"/></div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockTitle}>Shipping Address</div>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.full}`}><label>Address Line 1</label><input type="text" placeholder="Flat No., Building Name, Street"/></div>
              <div className={`${styles.formGroup} ${styles.full}`}><label>Address Line 2 (optional)</label><input type="text" placeholder="Area, Landmark"/></div>
              <div className={styles.formGroup}><label>City</label><input type="text" placeholder="Pune"/></div>
              <div className={styles.formGroup}><label>State</label>
                <select><option>Maharashtra</option><option>Delhi</option><option>Karnataka</option><option>Tamil Nadu</option><option>Gujarat</option></select>
              </div>
              <div className={styles.formGroup}><label>PIN Code</label><input type="text" placeholder="411001" maxLength={6}/></div>
            </div>
          </div>

          <div className={styles.block}>
            <div className={styles.blockTitle}>Delivery Option</div>
            <div className={styles.deliveryOpts}>
              {DELIVERY_OPTS.map((opt, i) => (
                <div key={i} className={`${styles.deliveryOpt} ${delivery===i ? styles.selected : ''}`} onClick={() => setDelivery(i)}>
                  <input type="radio" name="delivery" checked={delivery===i} readOnly/>
                  <div className={styles.optBody}><div className={styles.optLabel}>{opt.label}</div><div className={styles.optSub}>{opt.sub}</div></div>
                  <div className={styles.optPrice}>₹{opt.price}</div>
                </div>
              ))}
            </div>
          </div>

          <button className={`btn-cta ${styles.continueBtn}`} onClick={() => router.push('/payment')}>Continue to Payment →</button>
        </div>
        <OrderSummary shipping={DELIVERY_OPTS[delivery].price} />
      </div>
    </>
  );
}
